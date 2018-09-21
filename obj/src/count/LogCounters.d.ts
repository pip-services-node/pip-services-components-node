/** @module count */
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
/**
 * Adds logging functionality to the [[CachedCounters]] class.
 *
 * ### References ###
 *
 * Loggers, along with their context, can be referenced by passing the following references
 * to the object's [[setReferences]] method:
 *
 * - Loggers: <code>"\*:logger:\*:\*:1.0"</code>
 * - Context (source): <code>"\*:context-info:\*:\*:1.0"</code>.
 *
 * @see [[Counter]]
 * @see [[CachedCounters]]
 * @see [[CompositeLogger]]
 */
export declare class LogCounters extends CachedCounters implements IReferenceable {
    private readonly _logger;
    /**
     * Creates a new LogCounters object, which can be used for logging
     * [[CachedCounters counters]].
     */
    LogCounters(): void;
    /**
     * Adds all logger references to this object's [[CompositeLogger]] and sets its context.
     *
     * __References:__
     * - Loggers: <code>"\*:logger:\*:\*:1.0"</code>;
     * - Context (source): <code>"\*:context-info:\*:\*:1.0"</code>.
     *
     * @param references    an IReferences object, containing references to a context and to
     *                      the loggers that are to be added.
     *
     * @see [[CompositeLogger.setReferences]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */
    setReferences(references: IReferences): void;
    private counterToString;
    /**
     * Sorts the passed counters by their names and logs them using
     * the [[LogLevel.Info info]] log level.
     *
     * @param counters      the counters to log.
     *
     * @see [[CompositeLogger.info]]
     */
    protected save(counters: Counter[]): void;
}
