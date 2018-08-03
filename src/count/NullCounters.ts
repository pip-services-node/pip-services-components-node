/** @module count */
import { Timing } from './Timing';
import { ICounters } from './ICounters';

/**
 * Null implementation of the [[ICounters]] interface. Methods do not contain any logic and  
 * simply accept the parameters passed to them. Can be used to cut dependecies while testing.
 * 
 * @see [[ICounters]]
 */
export class NullCounters implements ICounters {

	/**
	 * Creates a new NullCounters object.
	 */
	public NullCounters() { }

	/**
	 * Null call to the [[ICounters.beginTiming beginTiming]] method.
	 * 
	 * @param name 	not used.
	 * @returns a new Timing, created using the default constructor.
	 * 
	 * @see [[Timing]]
	 */
	public beginTiming(name: string): Timing {
		return new Timing();
	}

	/**
	 * Null call to the [[ICounters.stats stats]] method.
	 * 
	 * @param name 		not used.
	 * @param value 	not used.
	 */
	public stats(name: string, value: number): void { }

	/**
	 * Null call to the [[ICounters.last last]] method.
	 * 
	 * @param name 		not used.
	 * @param value 	not used.
	 */
	public last(name: string, value: number): void { }

	/**
	 * Null call to the [[ICounters.timestampNow timestampNow]] method.
	 * 
	 * @param name 		not used.
	 */
	public timestampNow(name: string): void { }

	/**
	 * Null call to the [[ICounters.timestamp timestamp]] method.
	 * 
	 * @param name 		not used.
	 * @param value 	not used.
	 */
	public timestamp(name: string, value: Date): void { }

	/**
	 * Null call to the [[ICounters.incrementOne incrementOne]] method.
	 * 
	 * @param name 		not used.
	 */
	public incrementOne(name: string): void { }

	/**
	 * Null call to the [[ICounters.increment increment]] method.
	 * 
	 * @param name 		not used.
	 * @param value 	not used.
	 */
	public increment(name: string, value: number): void { }
}