"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: are counters being timed?
/**
 * Callback object to complete timing to execution blocks.
 */
class Timing {
    /**
     * Creates a new Timing object and starts timing the counter with the given name.
     *
     * @param counter 		the name of the counter to include in the callback.
     * @param callback 		the function to call once timing ends.
     */
    constructor(counter = null, callback = null) {
        this._counter = counter;
        this._callback = callback;
        this._start = new Date().getTime();
    }
    /**
     * Calls the [[ITimingCallback Timing Callback]] with the corresponding
     * counter name and the time passed since this Timing was started (created).
     */
    endTiming() {
        if (this._callback != null) {
            let elapsed = new Date().getTime() - this._start;
            this._callback.endTiming(this._counter, elapsed);
        }
    }
}
exports.Timing = Timing;
//# sourceMappingURL=Timing.js.map