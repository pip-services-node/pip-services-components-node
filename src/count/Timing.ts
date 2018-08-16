/** @module count */
import { ITimingCallback } from './ITimingCallback';
/**
 * Callback object that is used to end the timing for a block of code. 
 * 
 * An [[CounterType.Interval interval]] counter can create a new Timing and use it 
 * to measure the amount of time it takes a block of code to execute. The measured 
 * interval can additionally be added to a statistical counter to gather information 
 * about the minimum, maximum, and average time it takes for the block of code to execute.
 */
export class Timing {
	private _start: number;
	private _callback: ITimingCallback;
	private _counter: string;

	/**
	 * Creates a new Timing object and starts timing. To end timing, call this 
	 * object's [[endTiming]] method.
	 * 
	 * @param counter 		the name of the Interval Counter, for which a new 
	 * 						Timing is being created.
	 * @param callback 		the function to call with the elapsed time once 
	 * 						[[endTiming]] is called.
	 * 
	 * @see [[CounterType.Interval]]
	 * @see [[endTiming]]
	 */
	public constructor(counter: string = null, callback: ITimingCallback = null) {
		this._counter = counter;
		this._callback = callback;
		this._start = new Date().getTime();
	}

	/**
	 * Calls the [[ITimingCallback Timing Callback]] that was set for this object and 
	 * passes it the time elapsed since this Timing object was created.
	 */
	public endTiming(): void {
		if (this._callback != null) {
			let elapsed: number = new Date().getTime() - this._start;
			this._callback.endTiming(this._counter, elapsed);
		}
	}
}