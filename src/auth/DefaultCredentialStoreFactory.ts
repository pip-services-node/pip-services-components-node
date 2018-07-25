/** @module auth */
import { Descriptor } from 'pip-services-commons-node';

import { Factory } from '../build/Factory';
import { MemoryCredentialStore } from './MemoryCredentialStore';

/**
 * Contains static read-only descriptors for MemoryCredentialStore (as well as a default "credential-store" descriptor).
 * 
 * @see [[Factory]]
 */
export class DefaultCredentialStoreFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "credential-store", "default", "1.0");
	public static readonly MemoryCredentialStoreDescriptor = new Descriptor("pip-services", "credential-store", "memory", "*", "1.0");
	
	/**
	 * Adds an object factory for MemoryCredentialStore to this Factory.
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultCredentialStoreFactory.MemoryCredentialStoreDescriptor, MemoryCredentialStore);
	}	
}
