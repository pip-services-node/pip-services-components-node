import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for MemoryDiscovery (as well as a default discovery descriptor).
 *
 * @see Factory
 */
export declare class DefaultDiscoveryFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryDiscoveryDescriptor: Descriptor;
    /**
     * Adds an object factory for MemoryDiscovery to this Factory.
     *
     * @see Factory#Factory
     */
    constructor();
}
