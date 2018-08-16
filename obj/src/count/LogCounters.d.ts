/** @module count */
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
/**
 * Helper class for working with [[Counter Counters]] and logging them.
 *
 * @see [[Counter]]
 * @see [[CachedCounters]]
 * @see [[CompositeLogger]]
 */
export declare class LogCounters extends CachedCounters implements IReferenceable {
    private readonly _logger;
    /**
     * Creates a new LogCounters object, which can be used for logging CachedCounters.
     */
    LogCounters(): void;
    /**
     * Sets this object's [[CompositeLogger logger's]] references using
     * [[CompositeLogger.setReferences]].
     *
     * @param references    the references to set in the logger.
     *
     * @see [[CompositeLogger]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package.)
     */
    setReferences(references: IReferences): void;
    private counterToString;
    /**
     * Sorts the passed counters and passes them to the logger's
     * [[CompositeLogger.info info]] method.
     *
     * @param counters      the counters to log.
     *
     * @see [[CompositeLogger.info]]
     */
    protected save(counters: Counter[]): void;
}
