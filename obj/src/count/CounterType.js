"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module count */
/**
 * Enumeration that is used to specify a counter's type and
 * its purpose.
 */
var CounterType;
(function (CounterType) {
    /** Counter that keeps track of elapsed time using [[Timing]] objects. */
    CounterType[CounterType["Interval"] = 0] = "Interval";
    /** Counter that keeps track of the last (most recent) value. */
    CounterType[CounterType["LastValue"] = 1] = "LastValue";
    /** Counter that is used to calculate and keep track of statistics. */
    CounterType[CounterType["Statistics"] = 2] = "Statistics";
    /** Counter that is used to keep track of when an event last happened. */
    CounterType[CounterType["Timestamp"] = 3] = "Timestamp";
    /** Counter that incrementally keeps track of a value. */
    CounterType[CounterType["Increment"] = 4] = "Increment";
})(CounterType = exports.CounterType || (exports.CounterType = {}));
//# sourceMappingURL=CounterType.js.map