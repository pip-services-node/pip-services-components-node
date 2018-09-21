/** @module connect */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Creates [[IDiscovery]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[IDiscovery]]
 * @see [[MemoryDiscovery]]
 */
export declare class DefaultDiscoveryFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryDiscoveryDescriptor: Descriptor;
    /**
     * Create a new instance of the factory.
     */
    constructor();
}
