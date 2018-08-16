/** @module count */
/**
 * Enumeration that is used to specify a counter's type and 
 * its purpose.
 */
export enum CounterType {
    /** Counter that keeps track of elapsed time using [[Timing]] objects. */
    Interval = 0,
    /** Counter that keeps track of the last (most recent) value. */
    LastValue = 1,
    /** Counter that is used to calculate and keep track of statistics. */
    Statistics = 2,
    /** Counter that is used to keep track of when an event last happened. */
    Timestamp = 3,
    /** Counter that incrementally keeps track of a value. */
    Increment = 4
}