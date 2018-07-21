import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { IConfigReader } from './IConfigReader';
/**
 * Provides methods for reading configuration parameters that are stored in memory (as ConfigParams objects).
 */
export declare class MemoryConfigReader implements IConfigReader, IReconfigurable {
    protected _config: ConfigParams;
    /**
     * @param config    (optional) ConfigParams to use in this MemoryConfigReader.
     *                  If 'config' is omitted in the constructor, then it must be set
     *                  using {@link #configure} prior to using the new object.
     *
     * @see #configure
     */
    constructor(config?: ConfigParams);
    /**
     * Sets the ConfigParams that are to be used by this MemoryConfigReader.
     *
     * @param config    ConfigParams to save in memory.
     *
     * @see ConfigParams
     * @see IConfigurable
     */
    configure(config: ConfigParams): void;
    /**
     * Reads the ConfigParams stored in this object and returns them as a parameterized
     * {@link ConfigParams} object. Reader's ConfigParams must be set.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read.
     *
     * @see #readObject(correlationId: string, parameters: ConfigParams)
     */
    readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void): void;
}
