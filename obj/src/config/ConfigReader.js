"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let handlebars = require('handlebars');
const pip_services_commons_node_1 = require("pip-services-commons-node");
/**
 * Combination of the {@link IConfigReader} and {@link IConfigurable} interfaces. Allows for object
 * configuration using {@link ConfigParams} via the {@link #configure} method, and contains the abstract
 * method {@link #readConfig}, which, upon implementation, should contain the logic necessary for reading
 * and parsing ConfigParams. Also contains the {@link #parameterize} method.
 *
 * @see IConfigReader
 * @see IConfigurable
 * @see ConfigParams
 */
class ConfigReader {
    constructor() {
        this._parameters = new pip_services_commons_node_1.ConfigParams();
    }
    /**
     * Sets this object's configuration parameters.
     *
     * @param config    ConfigParams that contain a section named "parameters",
     *                  which will be used when {@link #parameterize parameterizing}
     *                  configurations that are passed to this ConfigReader.
     *
     * @see #parameterize
     * @see IConfigurable
     * @see ConfigParams
     */
    configure(config) {
        let parameters = config.getSection("parameters");
        if (parameters.length() > 0)
            this._parameters = parameters;
    }
    /**
     * Protected method for parameterizing ConfigReaders, which allows using {@link https://handlebarsjs.com/ handlebars}
     * to create parameterized configurations.
     *
     * The idea behind using parameterized configurations: handlebars allows us to take a templated configuration and
     * parameterize it, using a given set of parameters. Parameterization can be done with the help of environment variables
     * as well. For example: the configuration for a container can be created as such, that it will use certain environment
     * variables to tailor itself to the system by dynamically setting addresses, ports, etc.
     *
     * Example of a templated configuration:
     *
     *     {{#if MONGODB_ENABLED}}
     *      # MongoDb persistence
     *      - descriptor: "service-name:persistence:mongodb:default:1.0"
     *      connection:
     *          uri: {{MONGODB_SERVICE_URI}}{{^if MONGODB_SERVICE_URI}}"mongodb://localhost:27017/test"{{/if}}
     *     {{/if}}
     *
     * @param config        string containing the configuration that is to be parameterized using this ConfigReader's
     *                      parameters, as well as the parameters passed as 'parameters'.
     * @param parameters    ConfigParams that contain the parameters to override this ConfigReader's parameters with.
     * @returns the parameterized configuration.
     */
    parameterize(config, parameters) {
        parameters = this._parameters.override(parameters);
        // Convert template to lodash
        //config = config.replace(/{{/g, "<%=").replace(/}}/g, "%>");
        //let template = _.template(config);
        //return template(parameters);
        // return mustache.render(config, parameters);
        let template = handlebars.compile(config);
        return template(parameters);
    }
}
exports.ConfigReader = ConfigReader;
//# sourceMappingURL=ConfigReader.js.map