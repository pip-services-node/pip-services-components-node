/** @module count */
import { IReconfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';

import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';
import { CounterType } from './CounterType';
import { Counter } from './Counter';

/**
 * Helper class for working with [[Counter Counters]] and caching them.
 * 
 * @see [[Counter]]
 */
export abstract class CachedCounters implements ICounters, IReconfigurable, ITimingCallback {
    protected _interval: number = 300000;
    protected _resetTimeout: number = 0;
    protected _cache: { [id: string]: Counter } = {};
    protected _updated: boolean;
    protected _lastDumpTime: number = new Date().getTime();
    protected _lastResetTime: number = new Date().getTime();

    /**
     * Creates a new CachedCounters object.
     */
    public CachedCounters() { }

    /**
     * @returns this CachedCounters' update interval. Used to dump the cache to memory at 
     *          regular intervals.
     */
    public getInterval() {
        return this._interval;
    }

    /**
     * Sets this CachedCounters' update interval, which is used to dump the cache to memory 
     * at regular intervals.
     * 
     * @param value     the value to set this CachedCounters' update interval to.
     */
    public setInterval(value: number) {
        this._interval = value;
    }

    /**
     * Abstract method that will contain the logic for saving an array of [[Counter counters]] 
     * to memory.
     * 
     * @param counters  the Counters to save.
     */
    protected abstract save(counters: Counter[]): void;

    /**
     * Configures this object using the parameters provided. Looks for parameters with the 
     * keys "interval" and "reset_timeout" and sets them for this object. If a key is not found, 
     * the corresponding value will default to the value that was previously set for this object.
     * 
     * @param config    ConfigParams, containing "interval" and/or "reset_timeout" items.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    public configure(config: ConfigParams): void {
        this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._resetTimeout = config.getAsLongWithDefault("reset_timeout", this._resetTimeout);
    }

    /**
     * Removes the [[Counter]] with the given name from this object's cache.
     * 
     * @param name  the name of the counter to remove.
     */
    public clear(name: string): void {
        delete this._cache[name];
    }

    /**
     * Removes all [[Counter Counters]] from this object's cache.
     */
    public clearAll(): void {
        this._cache = {};
        this._updated = false;
    }

    /**
     * Creates and starts a new [[Timing]], which will call this object's [[endTiming]] 
     * method once timing stops.
     * 
     * @param name  the name of the counter to include in the callback.
     * 
     * @see [[Timing]]
     */
    public beginTiming(name: string): Timing {
        return new Timing(name, this);
    }

    /**
     * Dumps the [[Counter Counters]] that are stored in this object's 
     * cache to memory.
     * 
     * @see [[save]]
     */
    public dump(): void {
        if (!this._updated) return;

        var counters = this.getAll();

        this.save(counters);

        this._updated = false;
        this._lastDumpTime = new Date().getTime();
    }

    /**
     * Checks whether or not the update interval has passed (since the last 
     * [[dump]] was performed) and, if it has, performs a [[dump]].
     * 
     * @see [[dump]]
     */
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

    /**
     * Retrieves the [[Counter Counters]] that are stored in this object's cache.
     * 
     * If the need for cache resetting is detected, calling this method will 
     * trigger the reset.
     * 
     * @returns an array, containing all cached Counters.
     */
    public getAll(): Counter[] {
        let result: Counter[] = [];

        this.resetIfNeeded();

        for (var key in this._cache)
            result.push(this._cache[key]);

        return result;
    }

    /**
     * Looks for a [[Counter]] with the given name and type within this object's 
     * cache. If none are found, then a new [[Counter]] of the given 
     * [[CounterType type]] is created, added to the cache, and returned.
     * 
     * If the need for cache resetting is detected, calling this method will 
     * trigger the reset.
     * 
     * @param name  the name of the counter to retrieve.
     * @param type  the counter's type.
     * @returns the counter found in the cache or the one created (if none were found).
     * 
     * @throws an Error if name is <code>null</code>
     */
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

    //TODO: is the counter being timed?
    /**
     * Method that is called by a [[Timing Timing]] once timing has ended.
     * 
     * @param name      the name of the counter that was being timed.
     * @param elapsed   the time elapsed since timing began.
     * 
     * @see [[beginTiming]]
     */
    public endTiming(name: string, elapsed: number): void {
        let counter: Counter = this.get(name, CounterType.Interval);
        this.calculateStats(counter, elapsed);
        this.update();
    }

    /**
	 * Adds the given value to the named [[CounterType.Statistics Statistics Counter]] 
     * and recalculates its statistics, taking into account the new value. 
     * Statistics include last, count, min, max, and average.
	 * 
	 * @param name 		the name of the counter to update.
	 * @param value		the value to update the counter with.
     * 
     * @see [[CounterType]]
     * @see [[get]]
	 */
    public stats(name: string, value: number): void {
        let counter: Counter = this.get(name, CounterType.Statistics);
        this.calculateStats(counter, value);
        this.update();
    }

    /**
	 * Updates the named [[CounterType.LastValue Last Counter]] by setting 
     * its last value to the value given.
	 * 
	 * @param name 		the name of the counter to update.
	 * @param value		the value to update the counter with.
     * 
     * @see [[CounterType]]
     * @see [[get]]
	 */
    public last(name: string, value: number): void {
        let counter: Counter = this.get(name, CounterType.LastValue);
        counter.last = value;
        this.update();
    }

    /**
	 * Updates the named [[CounterType.Timestamp Timestamp Counter's]] time to 
     * the current time.
	 * 
	 * @param name 		the name of the counter to update.
     * 
     * @see [[CounterType]]
     * @see [[timestamp]]
	 */
    public timestampNow(name: string): void {
        this.timestamp(name, new Date());
    }

    /**
	 * Updates the named [[CounterType.Timestamp Timestamp Counter's]] time to 
     * the time given.
	 * 
	 * @param name 		the name of the counter to update.
	 * @param value		the timestamp to update the counter to.
     * 
     * @see [[CounterType]]
     * @see [[get]]
	 */
    public timestamp(name: string, value: Date): void {
        let counter: Counter = this.get(name, CounterType.Timestamp);
        counter.time = value;
        this.update();
    }

    /**
	 * Incrementes the named [[CounterType.Increment Incremental Counter]] by 1.
	 * 
	 * @param name 		the name of the counter to increment.
     * 
     * @see [[CounterType]]
     * @see [[increment]]
	 */
    public incrementOne(name: string): void {
        this.increment(name, 1);
    }

    /**
	 * Increments the named [[CounterType.Increment Incremental Counter]] by the 
	 * given value.
	 * 
	 * @param name 		the name of the counter to increment.
	 * @param value		the value to increment the counter by.
     * 
     * @see [[CounterType]]
     * @see [[get]]
	 */
    public increment(name: string, value: number): void {
        let counter: Counter = this.get(name, CounterType.Increment);
        counter.count = counter.count ? counter.count + value : value;
        this.update();
    }

}