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
     * Dummy call to the [[ICounters.beginTiming beginTiming]] method.
     *
     * @param name 	not used.
     * @returns a new Timing, created using the default constructor.
     *
     * @see [[Timing]]
     */
    beginTiming(name: string): Timing;
    /**
     * Null call to the [[ICounters.stats stats]] method.
     *
     * @param name 		not used.
     * @param value 	not used.
     */
    stats(name: string, value: number): void;
    /**
     * Null call to the [[ICounters.last last]] method.
     *
     * @param name 		not used.
     * @param value 	not used.
     */
    last(name: string, value: number): void;
    /**
     * Null call to the [[ICounters.timestampNow timestampNow]] method.
     *
     * @param name 		not used.
     */
    timestampNow(name: string): void;
    /**
     * Null call to the [[ICounters.timestamp timestamp]] method.
     *
     * @param name 		not used.
     * @param value 	not used.
     */
    timestamp(name: string, value: Date): void;
    /**
     * Null call to the [[ICounters.incrementOne incrementOne]] method.
     *
     * @param name 		not used.
     */
    incrementOne(name: string): void;
    /**
     * Null call to the [[ICounters.increment increment]] method.
     *
     * @param name 		not used.
     * @param value 	not used.
     */
    increment(name: string, value: number): void;
}
