"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Timing_1 = require("./Timing");
const CounterType_1 = require("./CounterType");
const Counter_1 = require("./Counter");
/**
 * Helper class for working with [[Counter Counters]] and caching them.
 *
 * @see [[Counter]]
 */
class CachedCounters {
    constructor() {
        this._interval = 300000;
        this._resetTimeout = 0;
        this._cache = {};
        this._lastDumpTime = new Date().getTime();
        this._lastResetTime = new Date().getTime();
    }
    /**
     * Creates a new CachedCounters object.
     */
    CachedCounters() { }
    /**
     * @returns this CachedCounters' update interval. Used to dump the cache to memory at
     *          regular intervals.
     */
    getInterval() {
        return this._interval;
    }
    /**
     * Sets this CachedCounters' update interval, which is used to dump the cache to memory
     * at regular intervals.
     *
     * @param value     the value to set this CachedCounters' update interval to.
     */
    setInterval(value) {
        this._interval = value;
    }
    /**
     * Configures this object using the parameters provided. Looks for parameters with the
     * keys "interval" and "reset_timeout" and sets them for this object. If a key is not found,
     * the corresponding value will default to the value that was previously set for this object.
     *
     * @param config    ConfigParams, containing "interval" and/or "reset_timeout" items.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    configure(config) {
        this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._resetTimeout = config.getAsLongWithDefault("reset_timeout", this._resetTimeout);
    }
    /**
     * Removes the [[Counter]] with the given name from this object's cache.
     *
     * @param name  the name of the counter to remove.
     */
    clear(name) {
        delete this._cache[name];
    }
    /**
     * Removes all [[Counter Counters]] from this object's cache.
     */
    clearAll() {
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
    beginTiming(name) {
        return new Timing_1.Timing(name, this);
    }
    /**
     * Dumps the [[Counter Counters]] that are stored in this object's
     * cache to memory.
     *
     * @see [[save]]
     */
    dump() {
        if (!this._updated)
            return;
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
    update() {
        this._updated = true;
        if (new Date().getTime() > this._lastDumpTime + this.getInterval()) {
            try {
                this.dump();
            }
            catch (ex) {
                // Todo: decide what to do
            }
        }
    }
    resetIfNeeded() {
        if (this._resetTimeout == 0)
            return;
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
    getAll() {
        let result = [];
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
    get(name, type) {
        if (!name)
            throw new Error("Name cannot be null");
        this.resetIfNeeded();
        let counter = this._cache[name];
        if (counter == null || counter.type != type) {
            counter = new Counter_1.Counter(name, type);
            this._cache[name] = counter;
        }
        return counter;
    }
    calculateStats(counter, value) {
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
    endTiming(name, elapsed) {
        let counter = this.get(name, CounterType_1.CounterType.Interval);
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
    stats(name, value) {
        let counter = this.get(name, CounterType_1.CounterType.Statistics);
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
    last(name, value) {
        let counter = this.get(name, CounterType_1.CounterType.LastValue);
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
    timestampNow(name) {
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
    timestamp(name, value) {
        let counter = this.get(name, CounterType_1.CounterType.Timestamp);
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
    incrementOne(name) {
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
    increment(name, value) {
        let counter = this.get(name, CounterType_1.CounterType.Increment);
        counter.count = counter.count ? counter.count + value : value;
        this.update();
    }
}
exports.CachedCounters = CachedCounters;
//# sourceMappingURL=CachedCounters.js.map