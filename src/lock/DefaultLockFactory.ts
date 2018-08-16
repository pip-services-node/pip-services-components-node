/** @module lock */
import { Descriptor } from 'pip-services-commons-node';

import { NullLock } from './NullLock';
import { MemoryLock } from './MemoryLock';
import { Factory } from '../build/Factory';

/**
 * Contains static read-only descriptors for [[NullLock]] and [[MemoryLock]] (as well as a default "lock" descriptor).
 * 
 * @see [[Factory]]
 */
export class DefaultLockFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "lock", "default", "1.0");
	public static readonly NullLockDescriptor = new Descriptor("pip-services", "lock", "null", "*", "1.0");
	public static readonly MemoryLockDescriptor = new Descriptor("pip-services", "lock", "memory", "*", "1.0");

	/**
	 * Create a new DefaultLockFactory object, containing [[NullLock]] and [[MemoryLock]] object factories.
	 * 
	 * @see [[NullLock]]
	 * @see [[MemoryLock]]
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultLockFactory.NullLockDescriptor, NullLock);
		this.registerAsType(DefaultLockFactory.MemoryLockDescriptor, MemoryLock);
	}
}