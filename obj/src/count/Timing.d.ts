/** @module count */
import { ITimingCallback } from './ITimingCallback';
/**
 * Callback object to complete timing to execution blocks.
 */
export declare class Timing {
    private _start;
    private _callback;
    private _counter;
    /**
     * Creates a new Timing object and starts timing the counter with the given name.
     *
     * @param counter 		the name of the counter to include in the callback.
     * @param callback 		the function to call once timing ends.
     */
    constructor(counter?: string, callback?: ITimingCallback);
    /**
     * Calls the [[ITimingCallback Timing Callback]] with the corresponding
     * counter name and the time passed since this Timing was started (created).
     */
    endTiming(): void;
}
