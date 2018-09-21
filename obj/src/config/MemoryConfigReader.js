"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module config */
/** @hidden */
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
/**
 * Provides methods for reading configuration parameters that are stored in memory (as ConfigParams objects).
 */
class MemoryConfigReader {
    /**
     * @param config    (optional) ConfigParams to use in this MemoryConfigReader.
     *                  If 'config' is omitted in the constructor, then it must be set
     *                  using [[configure]] prior to using the new object.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[configure]]
     */
    constructor(config = null) {
        this._config = new pip_services_commons_node_1.ConfigParams();
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
    configure(config) {
        this._config = config;
    }
    /**
     * Reads the ConfigParams stored in this object and returns them as a parameterized
     * ConfigParams object. Reader's ConfigParams must be set.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param parameters        used to parameterize the reader.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[readObject]]
     */
    readConfig(correlationId, parameters, callback) {
        if (parameters != null) {
            let config = new pip_services_commons_node_1.ConfigParams(this._config).toString();
            let template = _.template(config);
            config = template(parameters);
            callback(null, pip_services_commons_node_1.ConfigParams.fromString(config));
        }
        else {
            let config = new pip_services_commons_node_1.ConfigParams(this._config);
            ;
            callback(null, config);
        }
    }
}
exports.MemoryConfigReader = MemoryConfigReader;
//# sourceMappingURL=MemoryConfigReader.js.map