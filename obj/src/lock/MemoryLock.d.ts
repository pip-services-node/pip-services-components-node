/** @module lock */
import { Lock } from './Lock';
/**
 * Stores a registry of locks in memory. A lock contains a string key (by which
 * the resource that is being locked can be identified) and the lock's
 * time to live (after which the lock is considered to be expired).
 */
export declare class MemoryLock extends Lock {
    private _locks;
    /**
     * Attempts to acquire a lock for the resource that is identified by the given key.
     *
     * @param correlationId     not used.
     * @param key               the key to identify the lock by.
     * @param ttl               the lock's time-to-live.
     * @param callback          the function that will be called with the result of the attempt or
     *                          with an error (if one is raised).
     */
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    /**
     * Releases the lock with the given key.
     *
     * @param correlationId     not used.
     * @param key               the key of the lock that is to be released.
     * @param callback          (optional) the function to call once the lock has been released. Will be called
     *                          with <code>null</code>.
     */
    releaseLock(correlationId: string, key: string, callback?: (err: any) => void): void;
}
