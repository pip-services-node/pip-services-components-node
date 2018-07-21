"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Timing_1 = require("./Timing");
class CompositeCounters {
    constructor() {
        this._counters = [];
    }
    CompositeCounters(references = null) {
        if (references != null)
            this.setReferences(references);
    }
    setReferences(references) {
        var counters = references.getOptional(new pip_services_commons_node_1.Descriptor(null, "counters", null, null, null));
        for (let i = 0; i < counters.length; i++) {
            let counter = counters[i];
            if (counter != this)
                this._counters.push(counter);
        }
    }
    beginTiming(name) {
        return new Timing_1.Timing(name, this);
    }
    endTiming(name, elapsed) {
        for (let i = 0; i < this._counters.length; i++) {
            let counter = this._counters[i];
            var callback = counter;
            if (callback != null)
                callback.endTiming(name, elapsed);
        }
    }
    stats(name, value) {
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].stats(name, value);
    }
    last(name, value) {
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].last(name, value);
    }
    timestampNow(name) {
        this.timestamp(name, new Date());
    }
    timestamp(name, value) {
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].timestamp(name, value);
    }
    incrementOne(name) {
        this.increment(name, 1);
    }
    increment(name, value) {
        if (!name)
            throw new Error("Name cannot be null");
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].increment(name, value);
    }
}
exports.CompositeCounters = CompositeCounters;
//# sourceMappingURL=CompositeCounters.js.map