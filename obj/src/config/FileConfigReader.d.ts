/** @module config */
import { ConfigParams } from 'pip-services-commons-node';
import { ConfigReader } from './ConfigReader';
/**
 *
 * Abstract class that can be implemented by classes that need to read ConfigParams
 * from a file. The target file's location is stored in the '_path' field of this class.
 *
 * This class is abstract due to the fact that it inherits the abstract method
 * [[ConfigReader.readConfig]].
 *
 * ### Configuration parameters ###
 *
 * Parameters to pass to the [[configure]] method for component configuration:
 *
 * - "path" - the path to the target file.
 * - "parameters.<...>" - the parameters to parameterize the configuration reader with.
 *
 * @see [[ConfigReader]]
 * @see [[ConfigReader.readConfig]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
 *
 * ### Example ###
 *
 * Example usage:
 *
 *     public MyMethod(path: string) {
 *         let fileConfigReader = new FileConfigReader(path);
 *         fileConfigReader.configure(new ConfigParams());
 *         ...
 *     }
 */
export declare abstract class FileConfigReader extends ConfigReader {
    private _path;
    /**
     * @param path path to the target file, containing configuration parameters.
     */
    constructor(path?: string);
    /**
     * Get the path to the target configurations file.
     *
     * @returns path to the target file, containing configuration parameters.
     */
    getPath(): string;
    /**
     * Set the path to the target configurations file.
     *
     * @param path path to the target file, containing configuration parameters.
     */
    setPath(path: string): void;
    /**
     * Sets this object's configuration parameters and 'path' to the values
     * set in the passed configuration parameters.
     *
     * __Configuration parameters:__
     * - "path" - the path to the target file.
     * - "parameters.<...>" - the parameters to parameterize the configuration reader with.
     *
     * @param config    configures this class in accordance with [[ConfigReader.configure]]
     *                  and sets this class's '_path' field to the value stored in 'config'
     *                  with the key "path".
     *
     * @see [[ConfigReader.configure]]
     */
    configure(config: ConfigParams): void;
}
