import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
/**
 * A simple class that defines the context of execution. Used for various logging functions, where information
 * about the source that is being logging must be known (what's the process's name, what is it, what does it do).
 */
export declare class ContextInfo implements IReconfigurable {
    private _name;
    private _description;
    private _contextId;
    private _startTime;
    private _properties;
    /**
     * @param name  		(optional) name of the context of execution. Defaults to "unknown" if omitted.
     * @param description 	(optional) description of the context of execution. Defaults to null if omitted.
     */
    constructor(name?: string, description?: string);
    /**
     * Sets this object's 'name' and 'description' to the values set in the passed configuration parameters.
     * Also sets 'properties' to the values stored in the section named "properties".
     *
     * @param config 	the ConfigParams to configure this object with.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" Package)
     */
    configure(config: ConfigParams): void;
    /** Gets the name of the context of execution. */
    /**
    * Sets the name of the context of execution.
    * @param value		name to set. Defaults to "unknown" if null.
    */
    name: string;
    /** Gets the description of the context of execution. */
    /** Set the description of the context of execution. */
    description: string;
    /** Gets the id of the context of execution. */
    /** Sets the id of the context of execution. */
    contextId: string;
    /** Gets the time at which the execution was started. */
    /** Sets the time at which the execution was started. */
    startTime: Date;
    /** @returns the amount of time that has passed since the execution started. */
    readonly uptime: number;
    /** Gets the properties of the context of execution. */
    /**
     * Sets the properties of the context of execution.
     *
     * @param properties 	values that will be converted to a StringValueMap and saved
     * 						to this ContextInfo's properties.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.stringvaluemap.html StringValueMap]] (in the PipServices "Commons" Package)
    */
    properties: any;
    /**
     * Static method that creates and configures a ContextInfo object using the ConfigParams
     * passed in 'config'.
     *
     * @param config 	ConfigParams to use when configuring the new ContextInfo object.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    static fromConfig(config: ConfigParams): ContextInfo;
}
