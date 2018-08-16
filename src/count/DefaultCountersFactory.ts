/** @module count */
import { Descriptor } from 'pip-services-commons-node';

import { NullCounters } from './NullCounters';
import { LogCounters } from './LogCounters';
import { CompositeCounters } from './CompositeCounters';
import { Factory } from '../build/Factory';

/**
 * Contains static read-only descriptors for the [[NullCounters Null]], [[LogCounters Log]], 
 * and [[CompositeCounters Composite]] Counters (as well as a default "counters" descriptor).
 * 
 * @see [[Factory]]
 */
export class DefaultCountersFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "counters", "default", "1.0");
	public static readonly NullCountersDescriptor = new Descriptor("pip-services", "counters", "null", "*", "1.0");
	public static readonly LogCountersDescriptor = new Descriptor("pip-services", "counters", "log", "*", "1.0");
	public static readonly CompositeCountersDescriptor = new Descriptor("pip-services", "counters", "composite", "*", "1.0");

	/**
	 * Create a new DefaultCountersFactory object, containing [[NullCounters]], [[LogCounters]], 
	 * and [[CompositeCounters]] object factories.
	 * 
	 * @see [[NullCounters]]
	 * @see [[LogCounters]]
	 * @see [[CompositeCounters]]
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultCountersFactory.NullCountersDescriptor, NullCounters);
		this.registerAsType(DefaultCountersFactory.LogCountersDescriptor, LogCounters);
		this.registerAsType(DefaultCountersFactory.CompositeCountersDescriptor, CompositeCounters);
	}
}