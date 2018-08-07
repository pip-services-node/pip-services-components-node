/** @module lock */
import { ILock } from './ILock';
/**
 * Null implementation of the [[ILock]] interface. Methods do not contain any logic and
 * simply accept the parameters passed to them. Can be used to cut dependecies while testing.
 *
 * @see [[ILock]]
 */
export declare class NullLock implements ILock {
    /**
     * Null call to the [[ILock.tryAcquireLock tryAcquireLock]] method.
     *
     * @param correlationId     not used.
     * @param key               not used.
     * @param ttl               not used.
     * @param callback          will be called with <code>null, true<code>.
     */
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    /**
     * Null call to the [[ILock.acquireLock acquireLock]] method.
     *
     * @param correlationId     not used.
     * @param key               not used.
     * @param ttl               not used.
     * @param timeout           not used.
     * @param callback          will be called with <code>null<code>.
     */
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
    /**
     * Null call to the [[ILock.releaseLock releaseLock]] method.
     *
     * @param correlationId     not used.
     * @param key               not used.
     * @param callback          if given - will be called with <code>null<code>.
     */
    releaseLock(correlationId: string, key: string, callback?: (err: any) => void): void;
}
