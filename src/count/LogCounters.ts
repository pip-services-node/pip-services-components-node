/** @module count */
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { StringConverter } from 'pip-services-commons-node';

import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
import { CompositeLogger } from '../log/CompositeLogger';

//TODO: return to after finishing the "log" package.
/**
 * Helper class for working with [[Counter Counters]] and logging them.
 * 
 * @see [[Counter]]
 * @see [[CachedCounters]]
 * @see [[CompositeLogger]]
 */
export class LogCounters extends CachedCounters implements IReferenceable {
    private readonly _logger: CompositeLogger = new CompositeLogger();

    /**
     * Creates a new LogCounters object, which can be used for logging CachedCounters.
     */
    public LogCounters() { }

    /**
     * Sets this object's [[CompositeLogger logger's]] references using 
     * [[CompositeLogger.setReferences]].
     * 
     * @param references    the references to set in the logger.
     * 
     * @see [[CompositeLogger]]
     * @see [[IReferences]]
     */
    public setReferences(references: IReferences): void {
        this._logger.setReferences(references);
    }

    private counterToString(counter: Counter): string {
        var result = "Counter " + counter.name + " { ";
        result += "\"type\": " + counter.type;
        if (counter.last != null)
            result += ", \"last\": " + StringConverter.toString(counter.last);
        if (counter.count != null)
            result += ", \"count\": " + StringConverter.toString(counter.count);
        if (counter.min != null)
            result += ", \"min\": " + StringConverter.toString(counter.min);
        if (counter.max != null)
            result += ", \"max\": " + StringConverter.toString(counter.max);
        if (counter.average != null)
            result += ", \"avg\": " + StringConverter.toString(counter.average);
        if (counter.time != null)
            result += ", \"time\": " + StringConverter.toString(counter.time);
        result += " }";
        return result;
    }

    //TODO: are the counters be "logged"?
    /**
     * Sorts the passed counters and passes them to the logger's
     * [[CompositeLogger.info info]] method.
     * 
     * @param counters      the counters to log.
     * 
     * @see [[CompositeLogger.info]]
     */
    protected save(counters: Counter[]): void {
        if (this._logger == null || counters == null)
            return;

        if (counters.length == 0) return;

        counters.sort((c1, c2) => {
            if (c1.name < c2.name) return -1;
            if (c1.name > c2.name) return 1;
            return 0;
        });

        for(var i = 0; i < counters.length; i++) {
            this._logger.info(null, this.counterToString(counters[i]));
        }
    }

}