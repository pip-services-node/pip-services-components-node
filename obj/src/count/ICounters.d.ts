/** @module count */
import { Timing } from './Timing';
/**
 * Interface for creating classes that work with counters.
 */
export interface ICounters {
    /**
     * Abstract method that will contain the logic necessary for
     * starting a [[Timing]].
     *
     * @param name 	the name of the event that is to be timed.
     *
     * @returns the Timing object that was started.
     */
    beginTiming(name: string): Timing;
    /**
     * Abstract method that will contain the logic for updating a
     * [[CounterType.Statistics Statistics]] counter.
     *
     * @param name 		the name of the counter to update.
     * @param value		the value to update the counter with.
     */
    stats(name: string, value: number): void;
    /**
     * Abstract method that will contain the logic for updating a
     * [[CounterType.LastValue Last Counter]].
     *
     * @param name 		the name of the counter to update.
     * @param value		the value to update the counter with.
     */
    last(name: string, value: number): void;
    /**
     * Abstract method that will contain the logic for updating a
     * [[CounterType.Timestamp Timestamp Counter]] to the current time.
     *
     * @param name 		the name of the counter to update.
     */
    timestampNow(name: string): void;
    /**
     * Abstract method that will contain the logic for updating a
     * [[CounterType.Timestamp Timestamp Counter]] to the given time.
     *
     * @param name 		the name of the counter to update.
     * @param value		the timestamp to update the counter to.
     */
    timestamp(name: string, value: Date): void;
    /**
     * Abstract method that will contain the logic for incrementing an
     * [[CounterType.Increment Incremental Counter]] by 1.
     *
     * @param name 		the name of the counter to increment.
     */
    incrementOne(name: string): void;
    /**
     * Abstract method that will contain the logic for incrementing an
     * [[CounterType.Increment Incremental Counter]] by the
     * given value.
     *
     * @param name 		the name of the counter to increment.
     * @param value		the value to increment the counter by.
     */
    increment(name: string, value: number): void;
}
