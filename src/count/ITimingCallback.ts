/** @module count */
/**
 * Interface for classes that need to be called once 
 * a [[Timing]] has ended.
 * 
 * @see [[Timing]]
 */
export interface ITimingCallback {
    //TODO: is the counter being timed?
    /**
     * Method that is called by a [[Timing Timing]] once timing has ended.
     * 
     * @param name      the name of the counter that was being timed.
     * @param elapsed   the time elapsed since timing began.
     * 
     * @see [[Timing.endTiming]]
     */
    endTiming(name: string, elapsed: number): void;
}