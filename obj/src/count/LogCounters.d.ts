/** @module count */
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
/**
 * Performance counters that periodically dumps counters measurements to logger.
 *
 * ### Configuration parameters ###
 *
 * options:
 *   interval:        interval in milliseconds to save current counters measurements (default: 5 mins)
 *   reset_timeout:   timeout in milliseconds to reset the counters. 0 disables the reset (default: 0)
 *
 * ### References ###
 *
 * - *:logger:*:*:1.0           [[ILogger]] components to dump the captured counters
 * - *:context-info:*:*:1.0     (optional) [[ContextInfo]] to detect the context id and specify counters source
 *
 * @see [[Counter]]
 * @see [[CachedCounters]]
 * @see [[CompositeLogger]]
 *
 * ### Example ###
 *
 * let counters = new LogCounters();
 * counters.setReferences(References.fromTuples(
 *     new Descriptor("pip-services", "logger", "console", "default", "1.0"), new ConsoleLogger()
 * ));
 *
 * counters.increment("mycomponent.mymethod.calls");
 * let timing = counters.beginTiming("mycomponent.mymethod.exec_time");
 * try {
 *     ...
 * } finally {
 *     timing.endTiming();
 * }
 *
 * counters.dump();
 */
export declare class LogCounters extends CachedCounters implements IReferenceable {
    private readonly _logger;
    /**
     * Creates a new instance of the counters.
     */
    LogCounters(): void;
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     *
     */
    setReferences(references: IReferences): void;
    private counterToString;
    /**
     * Saves the current counters measurements.
     *
     * @param counters      current counters measurements to be saves.
     */
    protected save(counters: Counter[]): void;
}
