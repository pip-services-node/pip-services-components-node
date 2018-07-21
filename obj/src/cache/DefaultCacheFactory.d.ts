import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for the Null and Memory caches (as well as a default cache descriptor).
 *
 * @see Factory
 */
export declare class DefaultCacheFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullCacheDescriptor: Descriptor;
    static readonly MemoryCacheDescriptor: Descriptor;
    /**
     * Adds object factories for NullCache and MemoryCache to this Factory.
     *
     * @see Factory#Factory
     */
    constructor();
}
