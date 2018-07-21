import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for MemoryCredentialStore (as well as a default "credential-store" descriptor).
 *
 * @see Factory
 */
export declare class DefaultCredentialStoreFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryCredentialStoreDescriptor: Descriptor;
    /**
     * Adds an object factory for MemoryCredentialStore to this Factory.
     *
     * @see Factory#Factory
     */
    constructor();
}
