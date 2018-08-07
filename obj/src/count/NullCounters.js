"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module count */
const Timing_1 = require("./Timing");
/**
 * Dummy implementation of the [[ICounters]] interface. Methods do not contain any logic and
 * simply accept the parameters passed to them. Can be used to cut dependencies while testing.
 *
 * @see [[ICounters]]
 */
class NullCounters {
    /**
     * Creates a new NullCounters object.
     */
    NullCounters() { }
    /**
     * Dummy call to the [[ICounters.beginTiming beginTiming]] method.
     *
     * @param name 	not used.
     * @returns a new Timing, created using the default constructor.
     *
     * @see [[Timing]]
     */
    beginTiming(name) {
        return new Timing_1.Timing();
    }
    /**
     * Null call to the [[ICounters.stats stats]] method.
     *
     * @param name 		not used.
     * @param value 	not used.
     */
    stats(name, value) { }
    /**
     * Null call to the [[ICounters.last last]] method.
     *
     * @param name 		not used.
     * @param value 	not used.
     */
    last(name, value) { }
    /**
     * Null call to the [[ICounters.timestampNow timestampNow]] method.
     *
     * @param name 		not used.
     */
    timestampNow(name) { }
    /**
     * Null call to the [[ICounters.timestamp timestamp]] method.
     *
     * @param name 		not used.
     * @param value 	not used.
     */
    timestamp(name, value) { }
    /**
     * Null call to the [[ICounters.incrementOne incrementOne]] method.
     *
     * @param name 		not used.
     */
    incrementOne(name) { }
    /**
     * Null call to the [[ICounters.increment increment]] method.
     *
     * @param name 		not used.
     * @param value 	not used.
     */
    increment(name, value) { }
}
exports.NullCounters = NullCounters;
//# sourceMappingURL=NullCounters.js.map