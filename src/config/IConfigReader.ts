import { ConfigParams } from 'pip-services-commons-node';

/**
 * Interface that can be implemented by classes that need to read ConfigParams from a certain
 * source. Contains the abstract method [[readConfig]], which, upon implementation, should contain 
 * the logic necessary for reading and parsing ConfigParams.
 * 
 * @see [[ConfigReader]]
 */
export interface IConfigReader {
    
    /**
     * Abstract method that will contain the logic of reading and parsing ConfigParams 
     * in classes that implement this abstract class.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        ConfigParams to read.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read.
     */
    readConfig(correlationId: string, parameters: ConfigParams, 
        callback: (err: any, config: ConfigParams) => void): void;
}