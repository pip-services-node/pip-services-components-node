"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Used as performance counters. A Counter can show non-functional characteristics,
 * such as: times called, response time, objects saved/processed.
 */
class Counter {
    /**
     * Creates a new Counter object.
     *
     * @param name      the counter's name.
     * @param type      the counter's type.
     *
     * @see [[CounterType]]
     */
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}
exports.Counter = Counter;
//# sourceMappingURL=Counter.js.map