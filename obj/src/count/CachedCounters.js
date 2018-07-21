"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Timing_1 = require("./Timing");
const CounterType_1 = require("./CounterType");
const Counter_1 = require("./Counter");
class CachedCounters {
    constructor() {
        this._interval = 300000;
        this._resetTimeout = 0;
        this._cache = {};
        this._lastDumpTime = new Date().getTime();
        this._lastResetTime = new Date().getTime();
    }
    CachedCounters() { }
    getInterval() {
        return this._interval;
    }
    setInterval(value) {
        this._interval = value;
    }
    configure(config) {
        this._interval = config.getAsLongWithDefault("interval", this._interval);
        this._resetTimeout = config.getAsLongWithDefault("reset_timeout", this._resetTimeout);
    }
    clear(name) {
        delete this._cache[name];
    }
    clearAll() {
        this._cache = {};
        this._updated = false;
    }
    beginTiming(name) {
        return new Timing_1.Timing(name, this);
    }
    dump() {
        if (!this._updated)
            return;
        var counters = this.getAll();
        this.save(counters);
        this._updated = false;
        this._lastDumpTime = new Date().getTime();
    }
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
    getAll() {
        let result = [];
        this.resetIfNeeded();
        for (var key in this._cache)
            result.push(this._cache[key]);
        return result;
    }
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
    endTiming(name, elapsed) {
        let counter = this.get(name, CounterType_1.CounterType.Interval);
        this.calculateStats(counter, elapsed);
        this.update();
    }
    stats(name, value) {
        let counter = this.get(name, CounterType_1.CounterType.Statistics);
        this.calculateStats(counter, value);
        this.update();
    }
    last(name, value) {
        let counter = this.get(name, CounterType_1.CounterType.LastValue);
        counter.last = value;
        this.update();
    }
    timestampNow(name) {
        this.timestamp(name, new Date());
    }
    timestamp(name, value) {
        let counter = this.get(name, CounterType_1.CounterType.Timestamp);
        counter.time = value;
        this.update();
    }
    incrementOne(name) {
        this.increment(name, 1);
    }
    increment(name, value) {
        let counter = this.get(name, CounterType_1.CounterType.Increment);
        counter.count = counter.count ? counter.count + value : value;
        this.update();
    }
}
exports.CachedCounters = CachedCounters;
//# sourceMappingURL=CachedCounters.js.map