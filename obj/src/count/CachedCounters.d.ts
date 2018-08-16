/** @module count */
import { IReconfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';
import { CounterType } from './CounterType';
import { Counter } from './Counter';
/**
 * Helper class for working with [[Counter Counters]] and caching them.
 *
 * @see [[Counter]]
 */
export declare abstract class CachedCounters implements ICounters, IReconfigurable, ITimingCallback {
    protected _interval: number;
    protected _resetTimeout: number;
    protected _cache: {
        [id: string]: Counter;
    };
    protected _updated: boolean;
    protected _lastDumpTime: number;
    protected _lastResetTime: number;
    /**
     * Creates a new CachedCounters object.
     */
    CachedCounters(): void;
    /**
     * @returns this CachedCounters' update interval. Used to dump the cache to memory at
     *          regular intervals.
     */
    getInterval(): number;
    /**
     * Sets this CachedCounters' update interval, which is used to dump the cache to memory
     * at regular intervals.
     *
     * @param value     the value to set this CachedCounters' update interval to.
     */
    setInterval(value: number): void;
    /**
     * Abstract method that will contain the logic for saving an array of [[Counter counters]]
     * to memory.
     *
     * @param counters  the Counters to save.
     */
    protected abstract save(counters: Counter[]): void;
    /**
     * Configures this object using the parameters provided. Looks for parameters with the
     * keys "interval" and "reset_timeout" and sets them for this object. If a key is not found,
     * the corresponding value will default to the value that was previously set for this object.
     *
     * @param config    ConfigParams, containing "interval" and/or "reset_timeout" items.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    configure(config: ConfigParams): void;
    /**
     * Removes the [[Counter]] with the given name from this object's cache.
     *
     * @param name  the name of the counter to remove.
     */
    clear(name: string): void;
    /**
     * Removes all [[Counter Counters]] from this object's cache.
     */
    clearAll(): void;
    /**
     * Creates and starts a new [[Timing]], which will call this object's [[endTiming]]
     * method once timing stops.
     *
     * @param name  the name of the counter to include in the callback.
     *
     * @see [[Timing]]
     */
    beginTiming(name: string): Timing;
    /**
     * Dumps the [[Counter Counters]] that are stored in this object's
     * cache to memory.
     *
     * @see [[save]]
     */
    dump(): void;
    /**
     * Checks whether or not the update interval has passed (since the last
     * [[dump]] was performed) and, if it has, performs a [[dump]].
     *
     * @see [[dump]]
     */
    protected update(): void;
    private resetIfNeeded;
    /**
     * Retrieves the [[Counter Counters]] that are stored in this object's cache.
     *
     * If the need for cache resetting is detected, calling this method will
     * trigger the reset.
     *
     * @returns an array, containing all cached Counters.
     */
    getAll(): Counter[];
    /**
     * Looks for a [[Counter]] with the given name and type within this object's
     * cache. If none are found, then a new [[Counter]] of the given
     * [[CounterType type]] is created, added to the cache, and returned.
     *
     * If the need for cache resetting is detected, calling this method will
     * trigger the reset.
     *
     * @param name  the name of the counter to retrieve.
     * @param type  the counter's type.
     * @returns the counter found in the cache or the one created (if none were found).
     *
     * @throws an Error if name is <code>null</code>
     */
    get(name: string, type: CounterType): Counter;
    private calculateStats;
    /**
     * Method that is called by a [[Timing Timing]] once timing has ended.
     *
     * @param name      the name of the counter that was being timed.
     * @param elapsed   the time elapsed since timing began.
     *
     * @see [[beginTiming]]
     */
    endTiming(name: string, elapsed: number): void;
    /**
     * Adds the given value to the named [[CounterType.Statistics Statistics Counter]]
     * and recalculates its statistics, taking into account the new value.
     * Statistics include last, count, min, max, and average.
     *
     * @param name 		the name of the counter to update.
     * @param value		the value to update the counter with.
     *
     * @see [[CounterType]]
     * @see [[get]]
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
     * @see [[get]]
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
     * @see [[get]]
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
     * @see [[get]]
     */
    increment(name: string, value: number): void;
}
