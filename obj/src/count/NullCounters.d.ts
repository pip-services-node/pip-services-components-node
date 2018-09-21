/** @module count */
import { Timing } from './Timing';
import { ICounters } from './ICounters';
/**
 * Dummy implementation of the [[ICounters]] interface. Methods do not contain any logic and
 * simply accept the parameters passed to them. Can be used to cut dependencies while testing.
 *
 * @see [[ICounters]]
 */
export declare class NullCounters implements ICounters {
    /**
     * Creates a new NullCounters object.
     */
    NullCounters(): void;
    /**
     * Creates a new [[Timing]] callback object, which will call an ITimingCallback's
     * [[ITimingCallback.endTiming endTiming]] method once it receives the command to
     * [[Timing.endTiming stop timing]].
     *
     * @param name  the name of the Interval Counter, for which a Timing is to be created.
     * @returns the Timing callback object that was created.
     *
     * @see [[Timing]]
     * @see [[ITimingCallback]]
     * @see [[CounterType.Interval]]
     */
    beginTiming(name: string): Timing;
    /**
     * Adds the given value to the named [[CounterType.Statistics Statistics Counter]]
     * and recalculates its statistics, taking into account the new value.
     *
     * @param name 		the name of the counter to update.
     * @param value		the value to update the counter with.
     *
     * @see [[CounterType]]
     */
    stats(name: string, value: number): void;
    /**
     * Updates the named [[CounterType.LastValue Last Counter]] by setting
     * its last value to the value given.
     *
     * @param name 		the name of the counter to update.
     * @param value		the value to update the counter with.
     *
     * @see [[CounterType]]
     */
    last(name: string, value: number): void;
    /**
     * Updates the named [[CounterType.Timestamp Timestamp Counter's]] time to
     * the current time.
     *
     * @param name 		the name of the counter to update.
     *
     * @see [[CounterType]]
     * @see [[timestamp]]
     */
    timestampNow(name: string): void;
    /**
     * Updates the named [[CounterType.Timestamp Timestamp Counter's]] time to
     * the time given.
     *
     * @param name 		the name of the counter to update.
     * @param value		the timestamp to update the counter to.
     *
     * @see [[CounterType]]
     */
    timestamp(name: string, value: Date): void;
    /**
     * Incrementes the named [[CounterType.Increment Incremental Counter]] by 1.
     *
     * @param name 		the name of the counter to increment.
     *
     * @see [[CounterType]]
     * @see [[increment]]
     */
    incrementOne(name: string): void;
    /**
     * Increments the named [[CounterType.Increment Incremental Counter]] by the
     * given value.
     *
     * @param name 		the name of the counter to increment.
     * @param value		the value to increment the counter by.
     *
     * @see [[CounterType]]
     */
    increment(name: string, value: number): void;
}
