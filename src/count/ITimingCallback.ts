/** @module count */
/**
 * Interface for classes that need to process finished timings.
 * 
 * @see [[Timing]]
 */
export interface ITimingCallback {
    /**
     * Abstract method that will contain the logic for processing the result 
     * of a timing. This method will be called by a [[Timing Timing]] callback 
     * object once its [[Timing.endTiming endTiming]] method has been called. 
     * The resulting time interval can be used to update timing statistics.
     * 
     * @param name      the name of the Interval Counter that created the 
     *                  Timing object.
     * @param elapsed   the time elapsed since timing began.
     * 
     * @see [[Timing.endTiming]]
     */
    endTiming(name: string, elapsed: number): void;
}