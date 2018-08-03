/** @module auth */
import { Descriptor } from 'pip-services-commons-node';

import { Factory } from '../build/Factory';
import { MemoryCredentialStore } from './MemoryCredentialStore';

/**
 * Contains a static read-only descriptor for [[MemoryCredentialStore]] and the default "credential-store" descriptor.
 * 
 * @see [[Factory]]
 */
export class DefaultCredentialStoreFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "credential-store", "default", "1.0");
	public static readonly MemoryCredentialStoreDescriptor = new Descriptor("pip-services", "credential-store", "memory", "*", "1.0");
	
	/**
	 * Create a new DefaultCredentialStoreFactory object, containing a [[MemoryCredentialStore]] object factory.
	 * 
	 * @see [[MemoryCredentialStore]]
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultCredentialStoreFactory.MemoryCredentialStoreDescriptor, MemoryCredentialStore);
	}	
}
