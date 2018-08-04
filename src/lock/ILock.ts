/** @module lock */
/**
 * Interface for creating classes that manage resource locking.
 */
export interface ILock {
    /**
     * Abstract method that will contain the logic for attempting to 
     * acquire a lock.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the key to identify the lock by.
     * @param ttl               the lock's time-to-live.
     * @param callback          the function that will be called with the result of the attempt or 
     *                          with an error (if one is raised).
     */
    tryAcquireLock(correlationId: string, key: string, ttl: number,
        callback: (err: any, result: boolean) => void): void;
    
    /**
     * Abstract method that will contain the logic for acquiring a lock
     * 
     * @param correlationId     unique business transaction id to trace calls across components. 
     * @param key               the key to identify the lock by.
     * @param ttl               the lock's time-to-live.
     * @param timeout           the acquisition's retry timeout.
     * @param callback          the function to call once the lock has been acquired. Will be called 
     *                          with an error if one is raised.
     */
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number,
        callback: (err: any) => void): void;
    
    /**
     * Abstract method that will contain the logic for releasing the lock 
     * with the given key.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the key of the lock that is to be released.
     * @param callback          (optional) the function to call once the lock has been released. Will be called 
     *                          with an error if one is raised.
     */
    releaseLock(correlationId: string, key: string,
        callback?: (err: any) => void): void;
}