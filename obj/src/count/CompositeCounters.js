"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Timing_1 = require("./Timing");
/**
 * Helper class for grouping multiple [[ICounters counters]] together and updating all of them
 * at once using a single method call.
 *
 * ### References ###
 *
 * Counters can be referenced by passing the following reference
 * to the object's [[setReferences]] method:
 *
 * - <code>"\*:counters:\*:\*:1.0"</code>
 *
 * @see [[ICounters]]
 *
 * ### Example ###
 *
 * Example CompositeCounters object usage:
 *
 *      public MyMethod(references: IReferences) {
 *          let _counters = new CompositeCounters(references);
 *          _counters.stats("Statistics", 1);
 *          Counter counter = _counters.get("Statistics", CounterType.Statistics);
 *          ...
 *
 *          Timing timing = _counters.beginTiming("Timing");
 *          ...
 *      }
 */
class CompositeCounters {
    constructor() {
        this._counters = [];
    }
    /**
     * Creates a new CompositeCounters object. If "counters" references are given, they will be
     * set in the new object. If omitted - they can be set later on using [[setReferences]].
     *
     * @param references    the "counters" references to set.
     *
     * @see [[setReferences]]
     */
    CompositeCounters(references = null) {
        if (references != null)
            this.setReferences(references);
    }
    /**
     * Adds all counter references to this object's list of counters.
     *
     * __References:__
     * - <code>"\*:counters:\*:\*:1.0"</code>
     *
     * @param references    an IReferences object, containing references to the counters
     *                      that are to be added.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */
    setReferences(references) {
        var counters = references.getOptional(new pip_services_commons_node_1.Descriptor(null, "counters", null, null, null));
        for (let i = 0; i < counters.length; i++) {
            let counter = counters[i];
            if (counter != this)
                this._counters.push(counter);
        }
    }
    /**
     * Creates a new [[Timing]] callback object, which will call this object's [[endTiming]]
     * method once it receives the command to [[Timing.endTiming stop timing]].
     *
     * @param name  the name of the Interval Counter, for which a Timing is to be created.
     * @returns the Timing callback object that was created.
     *
     * @see [[Timing]]
     * @see [[endTiming]]
     * @see [[CounterType.Interval]]
     */
    beginTiming(name) {
        return new Timing_1.Timing(name, this);
    }
    /**
     * [[ITimingCallback.endTiming Ends timing]] for all counters that are instances
     * of [[ITimingCallback]].
     *
     * This method will be called by a [[Timing Timing]] callback object
     * once its [[Timing.endTiming endTiming]] method has been called.
     *
     * @param name      the Interval Counter name used to created the
     *                  Timing object.
     * @param elapsed   the time elapsed since timing began.
     *
     * @see [[ITimingCallback.endTiming]]
     * @see [[Timing.endTiming]]
     * @see [[beginTiming]]
     */
    endTiming(name, elapsed) {
        for (let i = 0; i < this._counters.length; i++) {
            let counter = this._counters[i];
            var callback = counter;
            if (callback != null)
                callback.endTiming(name, elapsed);
        }
    }
    /**
     * Calls the <code>stats</code> method for all included counters. <code>stats</code> adds the
     * given value to the named [[CounterType.Statistics Statistics Counter]] and recalculates its
     * statistics, taking into account the new value. Statistics include last, count, min, max, and
     * average.
     *
     * @param name 		the name of the counter to update.
     * @param value		the value to update the counter with.
     *
     * @see [[CounterType]]
     */
    stats(name, value) {
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].stats(name, value);
    }
    /**
     * Calls the <code>last</code> method for all included counters. <code>last</code> updates the
     * named [[CounterType.LastValue Last Counter]] by setting its last value to the value given.
     *
     * @param name 		the name of the counter to update.
     * @param value		the value to update the counter with.
     *
     * @see [[CounterType]]
     */
    last(name, value) {
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].last(name, value);
    }
    /**
     * Calls this class's [[timestamp]] method with the current time, which calls all included
     * counters' <code>timestamp</code> methods with the current time.
     *
     * @param name 		the name of the counter to update.
     *
     * @see [[CounterType]]
     * @see [[timestamp]]
     */
    timestampNow(name) {
        this.timestamp(name, new Date());
    }
    /**
     * Calls the <code>timestamp</code> method for all included counters. <code>timestamp</code>
     * updates the named [[CounterType.Timestamp Timestamp Counter's]] time to the time given.
     *
     * @param name 		the name of the counter to update.
     * @param value		the timestamp to update the counter to.
     *
     * @see [[CounterType]]
     */
    timestamp(name, value) {
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].timestamp(name, value);
    }
    /**
     * Calls all included counters' <code>increment</code> methods and increments the named
     * [[CounterType.Increment Incremental Counter]] by a value of 1.
     *
     * @param name 		the name of the counter to update.
     *
     * @see [[CounterType]]
     * @see [[increment]]
     */
    incrementOne(name) {
        this.increment(name, 1);
    }
    /**
     * Calls all included counters' <code>increment</code> methods and increments the named
     * [[CounterType.Increment Incremental Counter]] by the value given.
     *
     * @param name 		the name of the counter to increment. Cannot be null
     * @param value		the value to increment the counter by.
     *
     * @throws an Error if name is null.
     *
     * @see [[CounterType]]
     */
    increment(name, value) {
        if (!name)
            throw new Error("Name cannot be null");
        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].increment(name, value);
    }
}
exports.CompositeCounters = CompositeCounters;
//# sourceMappingURL=CompositeCounters.js.map