"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
/**
 * Provides methods for reading configuration parameters that are stored in memory (as ConfigParams objects).
 */
class MemoryConfigReader {
    /**
     * @param config    (optional) ConfigParams to use in this MemoryConfigReader.
     *                  If 'config' is omitted in the constructor, then it must be set
     *                  using {@link #configure} prior to using the new object.
     *
     * @see #configure
     */
    constructor(config = null) {
        this._config = new pip_services_commons_node_1.ConfigParams();
        this._config = config;
    }
    /**
     * Sets the ConfigParams that are to be used by this MemoryConfigReader.
     *
     * @param config    ConfigParams to save in memory.
     *
     * @see ConfigParams
     * @see IConfigurable
     */
    configure(config) {
        this._config = config;
    }
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