/** @module config */
/** @hidden */ 
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
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[configure]]
     */
    public constructor(config: ConfigParams = null) {
        this._config = config;
    }

    //TODO: example of parameters should be added.
    /**
     * Sets the parameters with which this configuration reader should be parameterized.
     * 
     * @param config    the ConfigParams to use for reader parameterization.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
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
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
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