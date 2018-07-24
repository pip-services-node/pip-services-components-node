/** @module log */
import { Descriptor } from 'pip-services-commons-node';

import { NullLogger } from './NullLogger';
import { ConsoleLogger } from './ConsoleLogger';
import { CompositeLogger } from './CompositeLogger';
import { Factory } from '../build/Factory';

export class DefaultLoggerFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "logger", "default", "1.0");
	public static readonly NullLoggerDescriptor = new Descriptor("pip-services", "logger", "null", "*", "1.0");
	public static readonly ConsoleLoggerDescriptor = new Descriptor("pip-services", "logger", "console", "*", "1.0");
	public static readonly CompositeLoggerDescriptor = new Descriptor("pip-services", "logger", "composite", "*", "1.0");

	public constructor() {
        super();
		this.registerAsType(DefaultLoggerFactory.NullLoggerDescriptor, NullLogger);
		this.registerAsType(DefaultLoggerFactory.ConsoleLoggerDescriptor, ConsoleLogger);
		this.registerAsType(DefaultLoggerFactory.CompositeLoggerDescriptor, CompositeLogger);
	}
}