/** @module cache */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for the [[NullCache Null]] and [[MemoryCache Memory]] caches
 * (as well as a default "cache" descriptor).
 *
 * @see [[Factory]]
 */
export declare class DefaultCacheFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullCacheDescriptor: Descriptor;
    static readonly MemoryCacheDescriptor: Descriptor;
    /**
     * Create a new DefaultCacheFactory object, containing [[NullCache]] and [[MemoryCache]]
     * object factories.
     *
     * @see [[NullCache]]
     * @see [[MemoryCache]]
     */
    constructor();
}
