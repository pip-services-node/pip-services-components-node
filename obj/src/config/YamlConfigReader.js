"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module config */
/** @hidden */
let fs = require('fs');
/** @hidden */
let yaml = require('js-yaml');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const FileConfigReader_1 = require("./FileConfigReader");
/**
* Provides methods for reading configuration parameters from a YAML file.
*
* @see [[FileConfigReader]]
*
* ### Example ###
*
* Example usage:
*
*     public MyMethod() {
*         ConfigParams config = YamlConfigReader.readConfig(null, "data/config.yaml");
*         ...
*     }
*/
class YamlConfigReader extends FileConfigReader_1.FileConfigReader {
    /**
     * @param path (optional) path to the target file, containing configuration parameters in YAML format.
     *              If 'path' is omitted in the constructor, then it must be set otherwise
     *              (for example, using "setPath()") before using the new object.
     *
     * @see [[FileConfigReader]]
     * @see [[FileConfigReader.setPath]]
     */
    constructor(path = null) {
        super(path);
    }
    /**
     * Reads the YAML data from the file and returns it as a parameterized nullable map.
     * Reader's path must be set.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param parameters        used to parameterize the reader.
     * @returns                 NullableMap with data from the YAML file.
     *
     * @see [[ConfigReader.parameterize]]
     */
    readObject(correlationId, parameters) {
        if (super.getPath() == null)
            throw new pip_services_commons_node_2.ConfigException(correlationId, "NO_PATH", "Missing config file path");
        try {
            // Todo: make this async?
            let content = fs.readFileSync(super.getPath(), 'utf8');
            content = this.parameterize(content, parameters);
            let data = yaml.safeLoad(content);
            return data;
        }
        catch (e) {
            throw new pip_services_commons_node_3.FileException(correlationId, "READ_FAILED", "Failed reading configuration " + super.getPath() + ": " + e)
                .withDetails("path", super.getPath())
                .withCause(e);
        }
    }
    /**
     * Reads the YAML data from the file and returns it as a parameterized ConfigParams object.
     * Reader's path must be set.
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
        try {
            let value = this.readObject(correlationId, parameters);
            let config = pip_services_commons_node_1.ConfigParams.fromValue(value);
            callback(null, config);
        }
        catch (ex) {
            callback(ex, null);
        }
    }
    /**
     * Static implementation of YamlConfigReader's non-static [[readObject]].
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     *
     * @see [[readObject]]
     */
    static readObject(correlationId, path, parameters) {
        return new YamlConfigReader(path).readObject(correlationId, parameters);
    }
    /**
     * Static implementation of YamlConfigReader's non-static [[readConfig]].
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     * @returns the ConfigParams that were read from the file.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[readConfig]]
     * @see [[readObject]]
     */
    static readConfig(correlationId, path, parameters) {
        let value = new YamlConfigReader(path).readObject(correlationId, parameters);
        let config = pip_services_commons_node_1.ConfigParams.fromValue(value);
        return config;
    }
}
exports.YamlConfigReader = YamlConfigReader;
//# sourceMappingURL=YamlConfigReader.js.map