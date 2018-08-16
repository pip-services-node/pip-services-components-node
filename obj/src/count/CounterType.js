"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module count */
/**
 * Enumeration that is used to specify a counter's type and
 * categorize them.
 */
var CounterType;
(function (CounterType) {
    /**
     * Counter that keeps track of time intervals.
     */
    CounterType[CounterType["Interval"] = 0] = "Interval";
    /**
     * Counter that keeps track of the last value
     * in a series.
     */
    CounterType[CounterType["LastValue"] = 1] = "LastValue";
    /**
     * Counter that is used to keep track of statistics.
     */
    CounterType[CounterType["Statistics"] = 2] = "Statistics";
    /**
     * Counter that is used to keep track of time using
     * timestamps.
     */
    CounterType[CounterType["Timestamp"] = 3] = "Timestamp";
    /**
     * Counter that incrementally keeps track of a value.
     */
    CounterType[CounterType["Increment"] = 4] = "Increment";
})(CounterType = exports.CounterType || (exports.CounterType = {}));
//# sourceMappingURL=CounterType.js.map