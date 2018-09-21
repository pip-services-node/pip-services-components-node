/** @module count */
import { CounterType } from './CounterType';
/**
 * Used as performance counters. A Counter can show non-functional characteristics,
 * such as: times called, response time, objects saved/processed. They collect information
 * that can be used to answer such questions as: how much, how often, how long.
 */
export declare class Counter {
    /** The counter's name, which should give an idea as to what is being counted. */
    name: string;
    /** The counter's [[CounterType type]], which defines what the counter keeps track of. */
    type: CounterType;
    /** The last value added to the counter. */
    last: number;
    /** The number of values added to this counter. */
    count: number;
    /** The minimum value added to this counter. */
    min: number;
    /** The maximum value added to this counter. */
    max: number;
    /** The average of the values that were added to this counter. */
    average: number;
    /** The (last) time set in this counter. */
    time: Date;
    /**
     * Creates a new Counter object.
     *
     * @param name      the counter's name.
     * @param type      the counter's type.
     *
     * @see [[CounterType]]
     */
    constructor(name: string, type: CounterType);
}
