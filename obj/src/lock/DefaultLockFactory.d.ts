/** @module lock */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for [[NullLock]] and [[MemoryLock]] (as well as a default "lock" descriptor).
 *
 * @see [[Factory]]
 */
export declare class DefaultLockFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullLockDescriptor: Descriptor;
    static readonly MemoryLockDescriptor: Descriptor;
    /**
     * Create a new DefaultLockFactory object, containing [[NullLock]] and [[MemoryLock]] object factories.
     *
     * @see [[NullLock]]
     * @see [[MemoryLock]]
     */
    constructor();
}
