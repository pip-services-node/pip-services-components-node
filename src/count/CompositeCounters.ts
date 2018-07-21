import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';

export class CompositeCounters implements ICounters, ITimingCallback, IReferenceable {
    protected readonly _counters: ICounters[] = [];

    public CompositeCounters(references: IReferences = null) {
        if (references != null)
            this.setReferences(references);
    }

    public setReferences(references: IReferences): void {
        var counters = references.getOptional<ICounters>(new Descriptor(null, "counters", null, null, null));
        for (let i = 0; i < counters.length; i++) {
            let counter: ICounters = counters[i];

            if (counter != this as ICounters)
                this._counters.push(counter);
        }
    }

    public beginTiming(name: string): Timing {
        return new Timing(name, this);
    }

    public endTiming(name: string, elapsed: number): void {
        for (let i = 0; i < this._counters.length; i++) {
            let counter: any = this._counters[i];
            var callback = counter as ITimingCallback;
            if (callback != null)
                callback.endTiming(name, elapsed);
        }
    }

    public stats(name: string, value: number): void {
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].stats(name, value);
    }

    public last(name: string, value: number): void {
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].last(name, value);
    }

    public timestampNow(name: string): void {
        this.timestamp(name, new Date());
    }

    public timestamp(name: string, value: Date): void {
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].timestamp(name, value);
    }

    public incrementOne(name: string): void {
        this.increment(name, 1);
    }

    public increment(name: string, value: number): void {
        if (!name)
            throw new Error("Name cannot be null");

        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].increment(name, value);
    }
}