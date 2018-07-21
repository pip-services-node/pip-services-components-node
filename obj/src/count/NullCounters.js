"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Timing_1 = require("./Timing");
class NullCounters {
    NullCounters() { }
    beginTiming(name) {
        return new Timing_1.Timing();
    }
    stats(name, value) { }
    last(name, value) { }
    timestampNow(name) { }
    timestamp(name, value) { }
    incrementOne(name) { }
    increment(name, value) { }
}
exports.NullCounters = NullCounters;
//# sourceMappingURL=NullCounters.js.map