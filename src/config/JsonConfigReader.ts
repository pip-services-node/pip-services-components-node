/** @module config */
/** @hidden */ 
let fs = require('fs');

import { ConfigParams } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node'
import { FileException } from 'pip-services-commons-node'
import { JsonConverter } from 'pip-services-commons-node'

import { FileConfigReader } from './FileConfigReader';

/**
 * Config reader that reads configuration from JSON file.
 * 
 * The reader supports parameterization using Handlebar template engine.
 * 
 * ### Configuration parameters ###
 * 
 * - path:          path to configuration file
 * - parameters:    this entire section is used as template parameters
 * - ...
 * 
 * @see [[IConfigReader]]
 * @see [[FileConfigReader]]
 * 
 * ### Example ###
 * 
 *     ======== config.json ======
 *     { "key1": "{{KEY1_VALUE}}", "key2": "{{KEY2_VALUE}}" }
 *     ===========================
 *     
 *     let configReader = new JsonConfigReader("config.json");
 *     
 *     let parameters = ConfigParams.fromTuples("KEY1_VALUE", 123, "KEY2_VALUE", "ABC");
 *     configReader.readConfig("123", parameters, (err, config) => {
 *         // Result: key1=123;key2=ABC
 *     });
 */
export class JsonConfigReader extends FileConfigReader {

    /** 
     * Creates a new instance of the config reader.
     * 
     * @param path  (optional) a path to configuration file.
     */
    public constructor(path: string = null) {
        super(path);
    }

    /**
     * Reads configuration file, parameterizes its content and converts it into JSON object.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param parameters        values to parameters the configuration.
     * @returns                 a JSON object with configuration.
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
     * Reads configuration and parameterize it with given values.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param parameters        values to parameters the configuration
     * @param callback          callback function that receives configuration or error.
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
     * Reads configuration file, parameterizes its content and converts it into JSON object.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param file              a path to configuration file.
     * @param parameters        values to parameters the configuration.
     * @returns                 a JSON object with configuration.
     */
    public static readObject(correlationId: string, path: string, parameters: ConfigParams): any {
        return new JsonConfigReader(path).readObject(correlationId, parameters);
    }

    /**
     * Reads configuration from a file, parameterize it with given values and returns a new ConfigParams object.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param file              a path to configuration file.
     * @param parameters        values to parameters the configuration.
     * @param callback          callback function that receives configuration or error.
     */
    public static readConfig(correlationId: string, path: string, parameters: ConfigParams): ConfigParams {
        let value: any = new JsonConfigReader(path).readObject(correlationId, parameters);
        let config = ConfigParams.fromValue(value);
        return config;
    }
}