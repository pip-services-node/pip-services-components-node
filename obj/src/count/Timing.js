"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//TODO: add "endTiming" call to the example?
/**
 * Callback object that is used to end the timing for a block of code.
 *
 * An [[CounterType.Interval interval]] counter can create a new Timing and use it
 * to measure the amount of time it takes a block of code to execute. The measured
 * interval can additionally be added to a statistical counter to gather information
 * about the minimum, maximum, and average time it takes for the block of code to execute.
 *
 * ### Example ###
 *
 * Using Timing objects:
 *
 *      public MyMethod(references: IReferences) {
 *          let _counters = new CompositeCounters(references);
 *          Timing timing = _counters.beginTiming("Timing");
 *          ...
 *      }
 */
class Timing {
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
    constructor(counter = null, callback = null) {
        this._counter = counter;
        this._callback = callback;
        this._start = new Date().getTime();
    }
    /**
     * Calls the [[ITimingCallback Timing Callback]] that was set for this object and
     * passes it the time elapsed since this Timing object was created.
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