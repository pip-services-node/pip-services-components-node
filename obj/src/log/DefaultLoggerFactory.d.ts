/** @module log */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for the [[NullLogger Null]], [[ConsoleLogger Console]],
 * and [[CompositeLogger Composite]] Loggers (as well as a default "logger" descriptor).
 *
 * @see [[Factory]]
 */
export declare class DefaultLoggerFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullLoggerDescriptor: Descriptor;
    static readonly ConsoleLoggerDescriptor: Descriptor;
    static readonly CompositeLoggerDescriptor: Descriptor;
    /**
     * Create a new DefaultLoggerFactory object, containing [[NullLogger]], [[ConsoleLogger]],
     * and [[CompositeLogger]] object factories.
     *
     * @see [[NullLogger]]
     * @see [[ConsoleLogger]]
     * @see [[CompositeLogger]]
     */
    constructor();
}
