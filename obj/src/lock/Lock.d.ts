/** @module lock */
import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { ILock } from './ILock';
/**
 * Abstract class that can be implemented by classes that need to be configurable and
 * manage resoure locking.
 */
export declare abstract class Lock implements ILock, IReconfigurable {
    private _retryTimeout;
    /**
     * Configures this object using the parameters provided. Looks for a parameter with the
     * key "options.retry_timeout" and sets it for this object. If the key is not found,
     * the value will default to the value that was previously set for this object.
     *
     * @param config    ConfigParams, containing a "options.retry_timeout" item.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    configure(config: ConfigParams): void;
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
    abstract tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    /**
     * Abstract method that will contain the logic for releasing the lock
     * with the given key.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the key of the lock that is to be released.
     * @param callback          (optional) the function to call once the lock has been released. Will be called
     *                          with an error if one is raised.
     */
    abstract releaseLock(correlationId: string, key: string, callback?: (err: any) => void): void;
    /**
     * Acquiring a lock for a certain resource, identifiable by the lock's key.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the key to identify the lock by.
     * @param ttl               the lock's time-to-live.
     * @param timeout           the acquisition's retry interval.
     * @param callback          the function to call once the lock has been acquired. Will be called
     *                          with an error if one is raised. If the retry interval times out,
     *                          a [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.conflictexception.html ConflictException]]
     *                          will be returned.
     */
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number, callback: (err: any) => void): void;
}
