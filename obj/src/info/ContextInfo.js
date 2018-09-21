"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module info */
/** @hidden */
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
/**
 * A simple class that defines the context of execution. Used for various logging functions, where information
 * about the source that is being logging must be known (what's the process's name, what is it, what does it do).
 *
 *
 * ### Configuration parameters ###
 *
 * Parameters to pass to the [[configure]] method for component configuration:
 *
 * - "name" - the context's name;
 * - "description" - the context's description;
 * - "properties.<...>" - additional properties of the context.
 *
 * ### Example ###
 *
 * Examples of ContextInfo object creation:
 *
 *     public MyMethod1() {
 *         let contextInfo = new ContextInfo();
 *         contextInfo.setName("new name");
 *         contextInfo.setDescription("new description");
 *         contextInfo.setContextId("new context id");
 *         ...
 *     }
 *
 *     public MyMethod2() {
 *         let config = ConfigParams.fromTuples(
 *             "info.name", "new name",
 *             "info.description", "new description",
 *             "properties.access_key", "key",
 *             "properties.store_key", "store key"
 *         );
 *
 *         let contextInfo = ContextInfo.fromConfig(config);
 *         ...
 *     }
 */
class ContextInfo {
    /**
     * @param name  		(optional) name of the context of execution. Defaults to "unknown" if omitted.
     * @param description 	(optional) description of the context of execution. Defaults to null if omitted.
     */
    constructor(name, description) {
        this._name = "unknown";
        this._description = null;
        this._contextId = os.hostname(); // IdGenerator.nextLong();
        this._startTime = new Date();
        this._properties = new pip_services_commons_node_1.StringValueMap();
        this._name = name || "unknown";
        this._description = description || null;
    }
    /**
     * Sets this object's 'name' and 'description' to the values set in the passed configuration parameters.
     * Also sets 'properties' to the values stored in the section named "properties".
     *
     * __Configuration parameters:__
     * - "name" - the context's name;
     * - "description" - the context's description;
     * - "properties.<...>" - additional properties of the context.
     *
     * @param config 	the ConfigParams to configure this object with.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
     */
    configure(config) {
        this.name = config.getAsStringWithDefault("name", this.name);
        this.description = config.getAsStringWithDefault("description", this.description);
        this.properties = config.getSection("properties");
    }
    /** Gets the name of the context of execution. */
    get name() { return this._name; }
    /**
     * Sets the name of the context of execution.
     * @param value		name to set. Defaults to "unknown" if null.
     */
    set name(value) { this._name = value || "unknown"; }
    /** Gets the description of the context of execution. */
    get description() { return this._description; }
    /** Set the description of the context of execution. */
    set description(value) { this._description = value; }
    /** Gets the id of the context of execution. */
    get contextId() { return this._contextId; }
    /** Sets the id of the context of execution. */
    set contextId(value) { this._contextId = value; }
    /** Gets the time at which the execution was started. */
    get startTime() { return this._startTime; }
    /** Sets the time at which the execution was started. */
    set startTime(value) { this._startTime = value || new Date(); }
    /** @returns the amount of time that has passed since the execution started. */
    get uptime() {
        return new Date().getTime() - this._startTime.getTime();
    }
    /** Gets the properties of the context of execution. */
    get properties() { return this._properties; }
    /**
     * Sets the properties of the context of execution.
     *
     * @param properties 	values that will be converted to a StringValueMap and saved
     * 						to this ContextInfo's properties.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.stringvaluemap.html StringValueMap]] (in the PipServices "Commons" package)
    */
    set properties(properties) {
        this._properties = pip_services_commons_node_1.StringValueMap.fromValue(properties);
    }
    /**
     * Static method that creates and configures a ContextInfo object using the ConfigParams
     * passed in 'config'.
     *
     * @param config 	ConfigParams to use when configuring the new ContextInfo object.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    static fromConfig(config) {
        let result = new ContextInfo();
        result.configure(config);
        return result;
    }
}
exports.ContextInfo = ContextInfo;
//# sourceMappingURL=ContextInfo.js.map