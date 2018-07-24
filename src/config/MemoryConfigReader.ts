/** @module config */
let _ = require('lodash');

import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';

import { IConfigReader } from './IConfigReader';

/**
 * Provides methods for reading configuration parameters that are stored in memory (as ConfigParams objects).
 */
export class MemoryConfigReader implements IConfigReader, IReconfigurable {
    protected _config: ConfigParams = new ConfigParams();

    /**
     * @param config    (optional) ConfigParams to use in this MemoryConfigReader. 
     *                  If 'config' is omitted in the constructor, then it must be set 
     *                  using [[configure]] prior to using the new object.
     * 
     * @see [[ConfigParams]]
     * @see [[configure]]
     */
    public constructor(config: ConfigParams = null) {
        this._config = config;
    }

    /**
     * Sets the ConfigParams that are to be used by this MemoryConfigReader.
     * 
     * @param config    ConfigParams to save in memory.
     * 
     * @see [[ConfigParams]]
     * @see [[IConfigurable]]
     */
    public configure(config: ConfigParams): void {
        this._config = config;
    }

    /**
     * Reads the ConfigParams stored in this object and returns them as a parameterized 
     * ConfigParams object. Reader's ConfigParams must be set.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read. 
     * 
     * @see [[ConfigParams]]
     * @see [[readObject]]
     */
    public readConfig(correlationId: string, parameters: ConfigParams,
        callback: (err: any, config: ConfigParams) => void): void {
        if (parameters != null) {
            let config = new ConfigParams(this._config).toString();
            let template = _.template(config);
            config = template(parameters);
            callback(null, ConfigParams.fromString(config));
        } else {
            let config = new ConfigParams(this._config);;
            callback(null, config);
        }
    }

}