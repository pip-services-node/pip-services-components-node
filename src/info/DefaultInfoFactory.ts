/** @module info */
import { Descriptor } from 'pip-services-commons-node';

import { Factory } from '../build/Factory';
import { ContextInfo } from './ContextInfo';

/**
 * Contains static read-only descriptors for ContextInfo and ContainerInfo (as well as a default "info" descriptor). 
 * 
 * @see [[Factory]]
 */
export class DefaultInfoFactory extends Factory {
	public static readonly Descriptor: Descriptor = new Descriptor("pip-services", "factory", "info", "default", "1.0");
	public static readonly ContextInfoDescriptor: Descriptor = new Descriptor("pip-services", "context-info", "default", "*", "1.0");
	public static readonly ContainerInfoDescriptor: Descriptor = new Descriptor("pip-services", "container-info", "default", "*", "1.0");
	
	/**
	 * Create a new DefaultInfoFactory object, containing two [[ContextInfo]] object factories - one for ContextInfo and one 
	 * for ContainerInfo.
	 * 
	 * @see [[ContextInfo]]
	 */
	public constructor() {
		super();
		this.registerAsType(DefaultInfoFactory.ContextInfoDescriptor, ContextInfo);
		this.registerAsType(DefaultInfoFactory.ContainerInfoDescriptor, ContextInfo);
	}
}
