/** @module count */
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { StringConverter } from 'pip-services-commons-node';

import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
import { CompositeLogger } from '../log/CompositeLogger';

/**
 * Adds logging functionality to the [[CachedCounters]] class.
 * 
 * Loggers can be referenced by passing "logger" references to this class's
 * [[setReferences]] method.
 * 
 * @see [[Counter]]
 * @see [[CachedCounters]]
 * @see [[CompositeLogger]]
 */
export class LogCounters extends CachedCounters implements IReferenceable {
    private readonly _logger: CompositeLogger = new CompositeLogger();

    /**
     * Creates a new LogCounters object, which can be used for logging 
     * [[CachedCounters counters]].
     */
    public LogCounters() { }

    /**
     * Adds all referenced loggers to this object's [[CompositeLogger]].
     * 
     * @param references    an IReferences object, containing the "logger" references to add.
     * 
     * @see [[CompositeLogger.setReferences]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
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

    /**
     * Sorts the passed counters by their names and logs them using 
     * the [[LogLevel.Info info]] log level.
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