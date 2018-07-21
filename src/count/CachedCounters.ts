import { IReconfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';

import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';
import { CounterType } from './CounterType';
import { Counter } from './Counter';

export abstract class CachedCounters implements ICounters, IReconfigurable, ITimingCallback {
    protected _interval: number = 300000;
    protected _resetTimeout: number = 0;
    protected _cache: { [id: string]: Counter } = {};
    protected _updated: boolean;
    protected _lastDumpTime: number = new Date().getTime();
    protected _lastResetTime: number = new Date().getTime();

    public CachedCounters() { }

    public getInterval() {
        return this._interval;
    }

    public setInterval(value: number) {
        this._interval = value;
    }

    protected abstract save(counters: Counter[]): void;

    public configure(config: ConfigParams): void {
        this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._resetTimeout = config.getAsLongWithDefault("reset_timeout", this._resetTimeout);
    }

    public clear(name: string): void {
        delete this._cache[name];
    }

    public clearAll(): void {
        this._cache = {};
        this._updated = false;
    }

    public beginTiming(name: string): Timing {
        return new Timing(name, this);
    }

    public dump(): void {
        if (!this._updated) return;

        var counters = this.getAll();

        this.save(counters);

        this._updated = false;
        this._lastDumpTime = new Date().getTime();
    }

    protected update(): void {
        this._updated = true;
        if (new Date().getTime() > this._lastDumpTime + this.getInterval()) {
            try {
                this.dump();
            } catch (ex) {
                // Todo: decide what to do
            }
        }
    }

    private resetIfNeeded(): void {
        if (this._resetTimeout == 0) return;

        var now = new Date().getTime();
        if (now - this._lastResetTime > this._resetTimeout) {
            this._cache = {};
            this._updated = false;
            this._lastResetTime = now;
        }
    }

    public getAll(): Counter[] {
        let result: Counter[] = [];

        this.resetIfNeeded();

        for (var key in this._cache)
            result.push(this._cache[key]);

        return result;
    }

    public get(name: string, type: CounterType): Counter {
        if (!name)
            throw new Error("Name cannot be null");

        this.resetIfNeeded();

        let counter: Counter = this._cache[name];

        if (counter == null || counter.type != type) {
            counter = new Counter(name, type);
            this._cache[name] = counter;
        }

        return counter;
    }

    private calculateStats(counter: Counter, value: number): void {
        if (counter == null)
            throw new Error("Counter cannot be null");

        counter.last = value;
        counter.count = counter.count != null ? counter.count + 1 : 1;
        counter.max = counter.max != null ? Math.max(counter.max, value) : value;
        counter.min = counter.min != null ? Math.min(counter.min, value) : value;
        counter.average = (counter.average != null && counter.count > 1
            ? (counter.average * (counter.count - 1) + value) / counter.count : value);
    }

    public endTiming(name: string, elapsed: number): void {
        let counter: Counter = this.get(name, CounterType.Interval);
        this.calculateStats(counter, elapsed);
        this.update();
    }

    public stats(name: string, value: number): void {
        let counter: Counter = this.get(name, CounterType.Statistics);
        this.calculateStats(counter, value);
        this.update();
    }

    public last(name: string, value: number): void {
        let counter: Counter = this.get(name, CounterType.LastValue);
        counter.last = value;
        this.update();
    }

    public timestampNow(name: string): void {
        this.timestamp(name, new Date());
    }

    public timestamp(name: string, value: Date): void {
        let counter: Counter = this.get(name, CounterType.Timestamp);
        counter.time = value;
        this.update();
    }

    public incrementOne(name: string): void {
        this.increment(name, 1);
    }

    public increment(name: string, value: number): void {
        let counter: Counter = this.get(name, CounterType.Increment);
        counter.count = counter.count ? counter.count + value : value;
        this.update();
    }

}