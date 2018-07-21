import { ConfigParams } from 'pip-services-commons-node';
import { ConfigReader } from './ConfigReader';
/**
 *
 * Abstract class that can be implemented by classes that need to read {@link ConfigParams}
 * from a file. The target file's location is stored in the '_path' field of this class.
 *
 * This class is abstract due to the fact that it inherits the abstract method
 * {@link ConfigReader#readConfig}.
 *
 * @see ConfigReader
 * @see ConfigReader#readConfig
 * @see ConfigParams
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
     * @param config    configures this class in accordance with {@link ConfigReader#configure}
     *                  and sets this class's '_path' field to the value stored in 'config'
     *                  with the key "path".
     *
     * @see ConfigReader#configure
     */
    configure(config: ConfigParams): void;
}
