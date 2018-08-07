/** @module count */
/**
 * Enumeration that is used to specify a counter's type and 
 * categorize them.
 */
export enum CounterType {
    /**
     * Counter that keeps track of time intervals.
     */
    Interval = 0,
    /**
     * Counter that keeps track of the last value 
     * in a series.
     */
    LastValue = 1,
    /**
     * Counter that is used to keep track of statistics.
     */
    Statistics = 2,
    /**
     * Counter that is used to keep track of when an event 
     * last happened using timestamps.
     */ //TODO: counter timestamps - check again
    Timestamp = 3,
    /**
     * Counter that incrementally keeps track of a value.
     */
    Increment = 4
}