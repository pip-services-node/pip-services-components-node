import { ConfigParams } from 'pip-services-commons-node';
import { FileConfigReader } from './FileConfigReader';
/**
 * Provides methods for reading configuration parameters from a JSON file.
 *
 * @see FileConfigReader
 */
export declare class JsonConfigReader extends FileConfigReader {
    /**
     * @param path (optional) path to the target file containing configuration parameters in JSON format.
     *              If 'path' is omitted in the constructor, then it must be set otherwise
     *              (for example, using "setPath()") before using the new object.
     *
     * @see FileConfigReader
     * @see FileConfigReader#setPath
     */
    constructor(path?: string);
    /**
     * Reads the JSON data from the file and returns it as a parameterized {@link NullableMap} object.
     * Reader's path must be set.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @returns                 NullableMap with data from the JSON file.
     *
     * @see ConfigReader#parameterize
     * @see NullableMap
     */
    readObject(correlationId: string, parameters: ConfigParams): any;
    /**
     * Reads the JSON data from the file and returns it as a parameterized {@link ConfigParams} object.
     * Reader's path must be set.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read.
     * @see #readObject(correlationId: string, parameters: ConfigParams)
     */
    readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void): void;
    /**
     * Static implementation of JsonConfigReader's non-static {@link #readObject}.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              location of the target JSON file.
     * @param parameters        used to parameterize the reader.
     *
     * @see #readObject(correlationId: string, parameters: ConfigParams)
     */
    static readObject(correlationId: string, path: string, parameters: ConfigParams): void;
    /**
     * Static implementation of JsonConfigReader's non-static {@link #readConfig}.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              location of the target JSON file.
     * @param parameters        used to parameterize the reader.
     *
     * @see #readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void)
     */
    static readConfig(correlationId: string, path: string, parameters: ConfigParams): ConfigParams;
}
