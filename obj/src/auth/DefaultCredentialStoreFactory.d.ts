/** @module auth */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains a static read-only descriptor for [[MemoryCredentialStore]] and the default "credential-store" descriptor.
 *
 * @see [[Factory]]
 */
export declare class DefaultCredentialStoreFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryCredentialStoreDescriptor: Descriptor;
    /**
     * Create a new DefaultCredentialStoreFactory object, containing a [[MemoryCredentialStore]] object factory.
     *
     * @see [[MemoryCredentialStore]]
     */
    constructor();
}
