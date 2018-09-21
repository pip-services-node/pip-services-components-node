import { ConfigParams } from 'pip-services-commons-node';
import { FileConfigReader } from './FileConfigReader';
/**
* Provides methods for reading configuration parameters from a YAML file.
*
* @see [[FileConfigReader]]
*/
export declare class YamlConfigReader extends FileConfigReader {
    /**
     * @param path (optional) path to the target file, containing configuration parameters in YAML format.
     *              If 'path' is omitted in the constructor, then it must be set otherwise
     *              (for example, using "setPath()") before using the new object.
     *
     * @see [[FileConfigReader]]
     * @see [[FileConfigReader.setPath]]
     */
    constructor(path?: string);
    /**
     * Reads the YAML data from the file and returns it as a parameterized nullable map.
     * Reader's path must be set.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param parameters        used to parameterize the reader.
     * @returns                 NullableMap with data from the YAML file.
     *
     * @see [[ConfigReader.parameterize]]
     */
    readObject(correlationId: string, parameters: ConfigParams): any;
    /**
     * Reads the YAML data from the file and returns it as a parameterized ConfigParams object.
     * Reader's path must be set.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param parameters        used to parameterize the reader.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     * @see [[readObject]]
     */
    readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void): void;
    /**
     * Static implementation of YamlConfigReader's non-static [[readObject]].
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     *
     * @see [[readObject]]
     */
    static readObject(correlationId: string, path: string, parameters: ConfigParams): void;
    /**
     * Static implementation of YamlConfigReader's non-static [[readConfig]].
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     * @returns the ConfigParams that were read from the file.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     * @see [[readConfig]]
     * @see [[readObject]]
     */
    static readConfig(correlationId: string, path: string, parameters: ConfigParams): ConfigParams;
}
