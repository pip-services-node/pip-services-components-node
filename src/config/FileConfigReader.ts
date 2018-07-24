/** @module config */
import { ConfigParams } from 'pip-services-commons-node';

import { ConfigReader } from './ConfigReader'

/**
 *  
 * Abstract class that can be implemented by classes that need to read ConfigParams 
 * from a file. The target file's location is stored in the '_path' field of this class.
 * 
 * This class is abstract due to the fact that it inherits the abstract method 
 * [[ConfigReader.readConfig]].
 * 
 * @see [[ConfigReader]]
 * @see [[ConfigReader.readConfig]]
 * @see [[ConfigParams]]
 */
export abstract class FileConfigReader extends ConfigReader {
    private _path: string;

    /**
     * @param path path to the target file, containing configuration parameters.
     */
    public constructor(path: string = null) {
        super();
        this._path = path;
    }

    /**
     * Get the path to the target configurations file.
     * 
     * @returns path to the target file, containing configuration parameters.
     */
    public getPath(): string {
        return this._path;
    }

    /**
     * Set the path to the target configurations file.
     * 
     * @param path path to the target file, containing configuration parameters.
     */
    public setPath(path: string) {
        this._path = path;
    }

    /**
     * Sets this object's configuration parameters and 'path' to the values
     * set in the passed configuration parameters.
     * 
     * @param config    configures this class in accordance with [[ConfigReader.configure]] 
     *                  and sets this class's '_path' field to the value stored in 'config' 
     *                  with the key "path".
     * 
     * @see [[ConfigReader.configure]]
     */
    public configure(config: ConfigParams): void {
        super.configure(config);
        this._path = config.getAsStringWithDefault("path", this._path);
    }    

}