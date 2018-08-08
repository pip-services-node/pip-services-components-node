/** @module count */
import { CounterType } from './CounterType';

/**
 * Used as performance counters. A Counter can show non-functional characteristics, 
 * such as: times called, response time, objects saved/processed. They collect information 
 * that can be used to answer such questions as: how much, how often, how long.
 */
export class Counter {
    /** The counter's name, which should give an idea as to what is being counted. */
    public name: string;
    /** The counter's [[CounterType type]], which defines what the counter keeps track of. */
    public type: CounterType;
    /** The last value added to the counter. */
    public last: number;
    /** The number of values added to this counter. */
    public count: number;
    /** The minimum value added to this counter. */
    public min: number;
    /** The maximum value added to this counter. */
    public max: number;
    /** The average of the values that were added to this counter. */ 
    public average: number;
    /** The (last) time set in this counter. */
    public time: Date;
    
    /**
     * Creates a new Counter object.
     * 
     * @param name      the counter's name.
     * @param type      the counter's type.
     * 
     * @see [[CounterType]]
     */
    public constructor(name: string, type: CounterType) {
        this.name = name;
        this.type = type;
    }


}