/** @module config */
/** @hidden */ 
let fs = require('fs');
/** @hidden */ 
let yaml = require('js-yaml');

import { ConfigParams } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { FileException } from 'pip-services-commons-node';

import { FileConfigReader } from './FileConfigReader';

 /**
 * Provides methods for reading configuration parameters from a YAML file.
 * 
 * @see [[FileConfigReader]]
 */
export class YamlConfigReader extends FileConfigReader {

    /** 
     * @param path (optional) path to the target file, containing configuration parameters in YAML format. 
     *              If 'path' is omitted in the constructor, then it must be set otherwise 
     *              (for example, using "setPath()") before using the new object.
     * 
     * @see [[FileConfigReader]]
     * @see [[FileConfigReader.setPath]]
     */
    public constructor(path: string = null) {
        super(path);
    }

    /**
     * Reads the YAML data from the file and returns it as a parameterized nullable map. 
     * Reader's path must be set.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @returns                 NullableMap with data from the YAML file.
     * 
     * @see [[ConfigReader.parameterize]]
     */
    public readObject(correlationId: string, parameters: ConfigParams): any {
        if (super.getPath() == null)
            throw new ConfigException(correlationId, "NO_PATH", "Missing config file path");

        try {
            // Todo: make this async?
            let content = fs.readFileSync(super.getPath(), 'utf8');
            content = this.parameterize(content, parameters);
            let data = yaml.safeLoad(content);
            return data;
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
     * Reads the YAML data from the file and returns it as a parameterized ConfigParams object. 
     * Reader's path must be set.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
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
     * Static implementation of YamlConfigReader's non-static [[readObject]].
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     * 
     * @see [[readObject]]
     */
    public static readObject(correlationId: string, path: string, parameters: ConfigParams): void {
        return new YamlConfigReader(path).readObject(correlationId, parameters);
    }

    /**
     * Static implementation of YamlConfigReader's non-static [[readConfig]].
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     * @returns the ConfigParams that were read from the file.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[readConfig]]
     * @see [[readObject]]
     */
    public static readConfig(correlationId: string, path: string, parameters: ConfigParams): ConfigParams {
        let value: any = new YamlConfigReader(path).readObject(correlationId, parameters);
        let config = ConfigParams.fromValue(value);
        return config;
    }
}