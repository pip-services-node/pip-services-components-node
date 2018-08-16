/** @module log */
import { Descriptor } from 'pip-services-commons-node';

import { NullLogger } from './NullLogger';
import { ConsoleLogger } from './ConsoleLogger';
import { CompositeLogger } from './CompositeLogger';
import { Factory } from '../build/Factory';

/**
 * Contains static read-only descriptors for the [[NullLogger Null]], [[ConsoleLogger Console]], 
 * and [[CompositeLogger Composite]] Loggers (as well as a default "logger" descriptor).
 * 
 * @see [[Factory]]
 */
export class DefaultLoggerFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "logger", "default", "1.0");
	public static readonly NullLoggerDescriptor = new Descriptor("pip-services", "logger", "null", "*", "1.0");
	public static readonly ConsoleLoggerDescriptor = new Descriptor("pip-services", "logger", "console", "*", "1.0");
	public static readonly CompositeLoggerDescriptor = new Descriptor("pip-services", "logger", "composite", "*", "1.0");

	/**
	 * Create a new DefaultLoggerFactory object, containing [[NullLogger]], [[ConsoleLogger]], 
	 * and [[CompositeLogger]] object factories.
	 * 
	 * @see [[NullLogger]]
	 * @see [[ConsoleLogger]]
	 * @see [[CompositeLogger]]
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultLoggerFactory.NullLoggerDescriptor, NullLogger);
		this.registerAsType(DefaultLoggerFactory.ConsoleLoggerDescriptor, ConsoleLogger);
		this.registerAsType(DefaultLoggerFactory.CompositeLoggerDescriptor, CompositeLogger);
	}
}