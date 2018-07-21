import { ITimingCallback } from './ITimingCallback';

export class Timing {
	private _start: number;
	private _callback: ITimingCallback;
	private _counter: string;

	public constructor(counter: string = null, callback: ITimingCallback = null) {
		this._counter = counter;
		this._callback = callback;
		this._start = new Date().getTime();
	}

	public endTiming(): void {
		if (this._callback != null) {
			let elapsed: number = new Date().getTime() - this._start;
			this._callback.endTiming(this._counter, elapsed);
		}
	}
}