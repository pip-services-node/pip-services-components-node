/** @module count */
import { ITimingCallback } from './ITimingCallback';
//TODO: are counters being timed?
/**
 * Times counters.
 */
export class Timing {
	private _start: number;
	private _callback: ITimingCallback;
	private _counter: string;

	/**
	 * Creates a new Timing object and starts timing the counter with the given name.
	 * 
	 * @param counter 		the name of the counter to include in the callback.
	 * @param callback 		the function to call once timing ends.
	 */
	public constructor(counter: string = null, callback: ITimingCallback = null) {
		this._counter = counter;
		this._callback = callback;
		this._start = new Date().getTime();
	}

	/**
	 * Calls the [[ITimingCallback Timing Callback]] with the corresponding 
	 * counter name and the time passed since this Timing was started (created).
	 */
	public endTiming(): void {
		if (this._callback != null) {
			let elapsed: number = new Date().getTime() - this._start;
			this._callback.endTiming(this._counter, elapsed);
		}
	}
}