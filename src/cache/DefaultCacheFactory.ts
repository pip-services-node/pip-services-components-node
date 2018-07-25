/** @module cache */
import { Descriptor } from 'pip-services-commons-node';

import { Factory } from '../build/Factory';
import { NullCache } from './NullCache';
import { MemoryCache } from './MemoryCache';

/**
 * Contains static read-only descriptors for the Null and Memory caches (as well as a default cache descriptor).
 * 
 * @see [[Factory]]
 */
export class DefaultCacheFactory extends Factory {
    public static readonly Descriptor: Descriptor = new Descriptor("pip-services", "factory", "cache", "default", "1.0");
    public static readonly NullCacheDescriptor: Descriptor = new Descriptor("pip-services", "cache", "null", "*", "1.0");
    public static readonly MemoryCacheDescriptor: Descriptor = new Descriptor("pip-services", "cache", "memory", "*", "1.0");

    /**
	 * Adds object factories for NullCache and MemoryCache to this Factory.
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultCacheFactory.MemoryCacheDescriptor, MemoryCache);
		this.registerAsType(DefaultCacheFactory.NullCacheDescriptor, NullCache);
	}
}
