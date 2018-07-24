/** @module count */
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { StringConverter } from 'pip-services-commons-node';

import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
import { CompositeLogger } from '../log/CompositeLogger';

export class LogCounters extends CachedCounters implements IReferenceable {
    private readonly _logger: CompositeLogger = new CompositeLogger();

    public LogCounters() { }

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