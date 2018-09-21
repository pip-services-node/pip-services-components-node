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
     *                  using [[configure]] prior to using the new object.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     * @see [[configure]]
     */
    constructor(config?: ConfigParams);
    /**
     * Sets the ConfigParams that are to be used by this MemoryConfigReader.
     *
     * @param config    ConfigParams to save in memory.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" Package)
     */
    configure(config: ConfigParams): void;
    /**
     * Reads the ConfigParams stored in this object and returns them as a parameterized
     * ConfigParams object. Reader's ConfigParams must be set.
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
}
