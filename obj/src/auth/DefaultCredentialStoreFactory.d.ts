/** @module auth */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Creates [[ICredentialStore]] components by their descriptors.
 *
 * @see [[IFactory]]
 * @see [[ICredentialStore]]
 */
export declare class DefaultCredentialStoreFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryCredentialStoreDescriptor: Descriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
