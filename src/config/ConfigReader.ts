/** @module config */
/** @hidden */ 
let _ = require('lodash');
/** @hidden */ 
let handlebars = require('handlebars');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node'

/**
 * Combination of the [[IConfigReader]] and 
 * [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] 
 * (in the PipServices "Commons" Package) interfaces. Allows for object configuration using ConfigParams via the [[configure]] method, 
 * and contains the abstract method [[readConfig]], which, upon implementation, should contain the logic necessary for reading and 
 * parsing ConfigParams. Also contains the [[parameterize]] method.
 * 
 * @see [[IConfigReader]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" Package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
 */
export abstract class ConfigReader implements IConfigurable {
    private _parameters: ConfigParams = new ConfigParams();

    public constructor() {}

    /**
     * Sets this object's configuration parameters.
     * 
     * @param config    ConfigParams that contain a section named "parameters", 
     *                  which will be used when [[parameterize parameterizing]] 
     *                  configurations that are passed to this ConfigReader.
     * 
     * @see [[parameterize]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" Package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    public configure(config: ConfigParams): void {
        let parameters = config.getSection("parameters")
        if (parameters.length() > 0)
            this._parameters = parameters;
    }    

    /**
     * Abstract method that will contain the logic of reading and parsing ConfigParams 
     * in classes that implement this abstract class.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param parameters        ConfigParams to read.
     * @param callback          callback function that will be called with an error or with the
     *                          ConfigParams that were read.
     */
    public abstract readConfig(correlationId: string, parameters: ConfigParams,
        callback: (err: any, config: ConfigParams) => void): void;

    /**
     * Protected method for parameterizing ConfigReaders, which allows using [[https://handlebarsjs.com/ handlebars]]
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
    protected parameterize(config: string, parameters: ConfigParams): string {
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