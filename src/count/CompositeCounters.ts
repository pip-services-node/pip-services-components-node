/** @module count */
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';

/**
 * Helper class for grouping multiple [[ICounters counters]] together and updating them all 
 * at once with one method call.
 * 
 * @see [[ICounters]]
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
     * Retrieves all "counters" [[IReferences references]] from the passed references and 
     * adds them to this object's list of counters.
     * 
     * @param references    the "counters" references to set.
     * 
     * @see [[IReferences]]
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
     * Creates and starts a new [[Timing]], which will call this object's [[endTiming]] 
     * method once timing stops.
     * 
     * @param name  the name of the counter to include in the callback.
     * 
     * @see [[Timing]]
     */
    public beginTiming(name: string): Timing {
        return new Timing(name, this);
    }

    /**
     * Method that is called by a [[Timing Timing]] once timing has ended. 
     * If any counters in this object are instances of [[ITimingCallback]], 
     * then their endTiming methods will also be called.
     * 
     * @param name      the name of the counter that was being timed.
     * @param elapsed   the time elapsed since timing began.
     * 
     * @see [[beginTiming]]
     * @see [[ITimingCallback]]
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
     * named [[CounterType.LastCounter Last Counter]] by setting its last value to the value given.
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
	 * Calls this class's [[increment]] method with a value of 1. The method [[increment]] calls all 
     * included counters' <code>increment</code> methods and increments the named 
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
	 * Calls the <code>increment</code> method for all included counters. <code>increment</code> 
     * increments the named [[CounterType.Increment Incremental Counter]] by the 
	 * given value.
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