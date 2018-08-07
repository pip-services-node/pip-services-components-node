/** @module count */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for the [[NullCounters Null]], [[LogCounters Log]],
 * and [[CompositeCounters Composite]] Counters (as well as a default "counters" descriptor).
 *
 * @see [[Factory]]
 */
export declare class DefaultCountersFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullCountersDescriptor: Descriptor;
    static readonly LogCountersDescriptor: Descriptor;
    static readonly CompositeCountersDescriptor: Descriptor;
    /**
     * Create a new DefaultCountersFactory object, containing [[NullCounters]], [[LogCounters]],
     * and [[CompositeCounters]] object factories.
     *
     * @see [[NullCounters]]
     * @see [[LogCounters]]
     * @see [[CompositeCounters]]
     */
    constructor();
}
