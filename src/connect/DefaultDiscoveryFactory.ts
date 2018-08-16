/** @module connect */
import { Descriptor } from 'pip-services-commons-node';

import { Factory } from '../build/Factory';
import { MemoryDiscovery } from './MemoryDiscovery';

/**
 * Contains a static read-only descriptor for [[MemoryDiscovery]] and the default "discovery" descriptor.
 * 
 * @see [[Factory]]
 */
export class DefaultDiscoveryFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "discovery", "default", "1.0");
	public static readonly MemoryDiscoveryDescriptor = new Descriptor("pip-services", "discovery", "memory", "*", "1.0");
	
	/**
	 * Create a new DefaultDiscoveryFactory object, containing a [[MemoryDiscovery]] object factory.
	 * 
	 * @see [[MemoryDiscovery]]
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultDiscoveryFactory.MemoryDiscoveryDescriptor, MemoryDiscovery);
	}	
}
