let fs = require('fs');

import { ConfigParams } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node'
import { FileException } from 'pip-services-commons-node'
import { JsonConverter } from 'pip-services-commons-node'

import { FileConfigReader } from './FileConfigReader';

/**
 * Provides methods for reading configuration parameters from a JSON file.
 * 
 * @see [[FileConfigReader]]
 */
export class JsonConfigReader extends FileConfigReader {

    /** 
     * @param path (optional) path to the target file containing configuration parameters in JSON format. 
     *              If 'path' is omitted in the constructor, then it must be set otherwise 
     *              (for example, calling the [[setPath]] method before using the new object).
     * 
     * @see [[FileConfigReader]]
     * @see [[FileConfigReader.setPath]]
     */
    public constructor(path: string = null) {
        super(path);
    }

    /**
     * Reads the JSON data from the file and returns it as a parameterized [[NullableMap]] object. 
     * Reader's path must be set.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @returns                 NullableMap with data from the JSON file.
     * 
     * @see [[ConfigReader.parameterize]]
     * @see [[NullableMap]]
     */
    public readObject(correlationId: string, parameters: ConfigParams): any {
        if (super.getPath() == null)
            throw new ConfigException(correlationId, "NO_PATH", "Missing config file path");

        try {
            // Todo: make this async?
            let data: string = fs.readFileSync(super.getPath(), "utf8");
            data = this.parameterize(data, parameters);
            return JsonConverter.toNullableMap(data);
        } catch (e) {
            throw new FileException(
                correlationId,
                "READ_FAILED",
                "Failed reading configuration " + super.getPath() + ": " + e
            )
            .withDetails("path", super.getPath())
            .withCause(e);
        }
    }

    /**
     * Reads the JSON data from the file and returns it as a parameterized ConfigParams object. 
     * Reader's path must be set.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read.
     * 
     * @see [[ConfigParams]]
     * @see [[readObject]]
     */
    public readConfig(correlationId: string, parameters: ConfigParams,
        callback: (err: any, config: ConfigParams) => void): void {
        try {
            let value: any = this.readObject(correlationId, parameters);
            let config = ConfigParams.fromValue(value);
            callback(null, config);
        } catch (ex) {
            callback(ex, null);
        }
    }

    /**
     * Static implementation of JsonConfigReader's non-static [[readObject]].
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              location of the target JSON file.
     * @param parameters        used to parameterize the reader.
     * 
     * @see [[readObject]]
     */
    public static readObject(correlationId: string, path: string, parameters: ConfigParams): void {
        return new JsonConfigReader(path).readObject(correlationId, parameters);
    }

    /**
     * Static implementation of JsonConfigReader's non-static [[readConfig]].
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              location of the target JSON file.
     * @param parameters        used to parameterize the reader.
     * 
     * @see [[readConfig]]
     */
    public static readConfig(correlationId: string, path: string, parameters: ConfigParams): ConfigParams {
        let value: any = new JsonConfigReader(path).readObject(correlationId, parameters);
        let config = ConfigParams.fromValue(value);
        return config;
    }
}