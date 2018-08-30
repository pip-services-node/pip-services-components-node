/** @module count */
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';

/**
 * Helper class for grouping multiple [[ICounters counters]] together and updating all of them 
 * at once using a single method call.
 * 
 * @see [[ICounters]]
 * 
 * ### Examples ###
 * public MyMethod(references: IReferences) {
 *      let _counters = new CompositeCounters(references); * 
 *      _counters.stats("Statistics", 1);
 *      Counter counter = _counters.get("Statistics", CounterType.Statistics);
 *      ...
 * 
 *      Timing timing = _counters.beginTiming("Timing");
 *      ...
 * }
 */
export class CompositeCounters implements ICounters, ITimingCallback, IReferenceable {
    protected readonly _counters: ICounters[] = [];

    /**
     * Creates a new CompositeCounters object. If "counters" references are given, they will be 
     * set in the new object. If omitted - they can be set later on using [[setReferences]].
     * 
     * @param references    the "counters" references to set.
     * 
     * @see [[setReferences]]
     */
    public CompositeCounters(references: IReferences = null) {
        if (references != null)
            this.setReferences(references);
    }

    /**
     * Adds all referenced counters to this object's list of counters.
     * 
     * @param references    an IReferences object, containing references to the "counters" 
     *                      that are to be added.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */
    public setReferences(references: IReferences): void {
        var counters = references.getOptional<ICounters>(new Descriptor(null, "counters", null, null, null));
        for (let i = 0; i < counters.length; i++) {
            let counter: ICounters = counters[i];

            if (counter != this as ICounters)
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
    public beginTiming(name: string): Timing {
        return new Timing(name, this);
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
    public endTiming(name: string, elapsed: number): void {
        for (let i = 0; i < this._counters.length; i++) {
            let counter: any = this._counters[i];
            var callback = counter as ITimingCallback;
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
    public stats(name: string, value: number): void {
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
    public last(name: string, value: number): void {
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
    public timestampNow(name: string): void {
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
    public timestamp(name: string, value: Date): void {
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
    public incrementOne(name: string): void {
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
    public increment(name: string, value: number): void {
        if (!name)
            throw new Error("Name cannot be null");

        for (let i = 0; i < this._counters.length; i++)
            this._counters[i].increment(name, value);
    }
}