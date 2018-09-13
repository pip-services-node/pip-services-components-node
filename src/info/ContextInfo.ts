/** @module info */
/** @hidden */ 
let os = require('os');

import { StringValueMap } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';

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
 * ### Examples ###
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
export class ContextInfo implements IReconfigurable {	
	private _name: string = "unknown";
	private _description: string = null;
	private _contextId: string = os.hostname(); // IdGenerator.nextLong();
	private _startTime: Date = new Date();
	private _properties: StringValueMap = new StringValueMap();

	/**
	 * @param name  		(optional) name of the context of execution. Defaults to "unknown" if omitted.
	 * @param description 	(optional) description of the context of execution. Defaults to null if omitted.
	 */
	public constructor(name?: string, description?: string) {
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
	public configure(config: ConfigParams): void {
		this.name = config.getAsStringWithDefault("name", this.name);
		this.description = config.getAsStringWithDefault("description", this.description);		
		this.properties = config.getSection("properties");
	}
	
	/** Gets the name of the context of execution. */
	public get name(): string { return this._name; }
	/** 
	 * Sets the name of the context of execution. 
	 * @param value		name to set. Defaults to "unknown" if null.
	 */
	public set name(value: string) { this._name = value || "unknown"; }
	
	/** Gets the description of the context of execution. */
	public get description(): string { return this._description; }
	/** Set the description of the context of execution. */
	public set description(value: string) { this._description = value; }
	
	/** Gets the id of the context of execution. */
	public get contextId(): string { return this._contextId; }
	/** Sets the id of the context of execution. */
	public set contextId(value: string) { this._contextId = value; }
	
	/** Gets the time at which the execution was started. */
	public get startTime(): Date { return this._startTime; }
	/** Sets the time at which the execution was started. */
	public set startTime(value: Date) { this._startTime = value || new Date(); }

	/** @returns the amount of time that has passed since the execution started. */
	public get uptime(): number {
		return new Date().getTime() - this._startTime.getTime();
	}

	/** Gets the properties of the context of execution. */
	public get properties(): any { return this._properties; }
	/** 
	 * Sets the properties of the context of execution. 
	 * 
	 * @param properties 	values that will be converted to a StringValueMap and saved
	 * 						to this ContextInfo's properties.
	 * 
	 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.stringvaluemap.html StringValueMap]] (in the PipServices "Commons" package)
	*/
	public set properties(properties: any) {
		this._properties = StringValueMap.fromValue(properties);
	}
	
	/**
	 * Static method that creates and configures a ContextInfo object using the ConfigParams 
	 * passed in 'config'.
	 * 
	 * @param config 	ConfigParams to use when configuring the new ContextInfo object.
	 * 
	 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
	 */
	public static fromConfig(config: ConfigParams): ContextInfo {
		let result = new ContextInfo();
		result.configure(config);
		return result;
	}
}
