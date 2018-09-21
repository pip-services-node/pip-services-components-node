/** @module lock */
import { ILock } from './ILock';
/**
 * Dummy implementation of the [[ILock]] interface. Methods do not contain any logic and  
 * simply accept the parameters passed to them. Can be used to cut dependecies while testing.
 * 
 * @see [[ILock]]
 */
export class NullLock implements ILock {
    /**
     * Attempts to acquire a lock for the resource that is identified by the given key.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param key               the key to identify the lock by.
     * @param ttl               the lock's time-to-live.
     * @param callback          the function that will be called with the result of the attempt or 
     *                          with an error (if one is raised).
     */
    public tryAcquireLock(correlationId: string, key: string, ttl: number,
        callback: (err: any, result: boolean) => void): void {
        callback(null, true);
    }

    /**
     * Acquiring a lock for a certain resource, identifiable by the lock's key.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain.. 
     * @param key               the key to identify the lock by.
     * @param ttl               the lock's time-to-live.
     * @param timeout           the acquisition's retry interval.
     * @param callback          the function to call once the lock has been acquired. Will be called 
     *                          with an error if one is raised.
     */
    public acquireLock(correlationId: string, key: string, ttl: number, timeout: number,
        callback: (err: any) => void): void {
        callback(null);
    }

    /**
     * Releases the lock with the given key.
     * 
     * @param correlationId     not used.
     * @param key               the key of the lock that is to be released.
     * @param callback          (optional) the function to call once the lock has been released.
     */
    public releaseLock(correlationId: string, key: string,
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }
}