import { Descriptor } from 'pip-services-commons-node';

import { Factory } from '../build/Factory';
import { MemoryDiscovery } from './MemoryDiscovery';

/**
 * Contains static read-only descriptors for MemoryDiscovery (as well as a default discovery descriptor).
 * 
 * @see Factory
 */
export class DefaultDiscoveryFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "discovery", "default", "1.0");
	public static readonly MemoryDiscoveryDescriptor = new Descriptor("pip-services", "discovery", "memory", "*", "1.0");
	
    /**
	 * Adds an object factory for MemoryDiscovery to this Factory.
	 * 
	 * @see Factory#Factory
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultDiscoveryFactory.MemoryDiscoveryDescriptor, MemoryDiscovery);
	}	
}
