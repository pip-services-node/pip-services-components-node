"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let fs = require('fs');
let yaml = require('js-yaml');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const FileConfigReader_1 = require("./FileConfigReader");
/**
* Provides methods for reading configuration parameters from a YAML file.
*
* @see FileConfigReader
*/
class YamlConfigReader extends FileConfigReader_1.FileConfigReader {
    /**
     * @param path (optional) path to the target file containing configuration parameters in YAML format.
     *              If 'path' is omitted in the constructor, then it must be set otherwise
     *              (for example, using "setPath()") before using the new object.
     *
     * @see FileConfigReader
     * @see FileConfigReader#setPath
     */
    constructor(path = null) {
        super(path);
    }
    /**
     * Reads the YAML data from the file and returns it as a parameterized {@link NullableMap} object.
     * Reader's path must be set.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @returns                 NullableMap with data from the YAML file.
     *
     * @see ConfigReader#parameterize
     * @see NullableMap
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
     * Reads the YAML data from the file and returns it as a parameterized {@link ConfigParams} object.
     * Reader's path must be set.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        used to parameterize the reader.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read.
     *
     * @see #readObject(correlationId: string, parameters: ConfigParams)
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
     * Static implementation of YamlConfigReader's non-static {@link #readObject}.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     *
     * @see #readObject(correlationId: string, parameters: ConfigParams)
     */
    static readObject(correlationId, path, parameters) {
        return new YamlConfigReader(path).readObject(correlationId, parameters);
    }
    /**
     * Static implementation of YamlConfigReader's non-static {@link #readConfig}.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param path              location of the target YAML file.
     * @param parameters        used to parameterize the reader.
     *
     * @see #readConfig(correlationId: string, parameters: ConfigParams, callback: (err: any, config: ConfigParams) => void)
     */
    static readConfig(correlationId, path, parameters) {
        let value = new YamlConfigReader(path).readObject(correlationId, parameters);
        let config = pip_services_commons_node_1.ConfigParams.fromValue(value);
        return config;
    }
}
exports.YamlConfigReader = YamlConfigReader;
//# sourceMappingURL=YamlConfigReader.js.map