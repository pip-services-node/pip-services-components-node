/** @module connect */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains a static read-only descriptor for [[MemoryDiscovery]] and the default "discovery" descriptor.
 *
 * @see [[Factory]]
 */
export declare class DefaultDiscoveryFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryDiscoveryDescriptor: Descriptor;
    /**
     * Create a new DefaultDiscoveryFactory object, containing a [[MemoryDiscovery]] object factory.
     *
     * @see [[MemoryDiscovery]]
     */
    constructor();
}
