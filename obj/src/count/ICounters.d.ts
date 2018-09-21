/** @module count */
import { Timing } from './Timing';
/**
 * Interface for creating classes that work with counters.
 *
 * ### Example ###
 *
 * Example implementation of the ICounters interface:
 *
 *      export class MyCounters implements ICounters {
 *          public beginTiming(name: string) : Timing {...}
 *          public stats(name: string, value: number) : void {...}
 *          ...
 *      }
 */
export interface ICounters {
    /**
     * Abstract method that will contain the logic for
     * creating a new [[Timing]] callback object.
     *
     * @param name 	the name of the Interval Counter, for which a Timing is to be created.
     * @returns the Timing callback object that was created.
     *
     * @see [[Timing]]
     * @see [[ITimingCallback.endTiming]]
     * @see [[CounterType.Interval]]
     */
    beginTiming(name: string): Timing;
    /**
     * Abstract method that will contain the logic for updating a
     * [[CounterType.Statistics Statistics Counter]].
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
