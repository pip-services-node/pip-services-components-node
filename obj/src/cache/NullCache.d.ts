/** @module cache */
import { ICache } from './ICache';
/**
 * Dummy implementation of the [[ICache]] interface. Returns null instead of real values.
 * Can be used for cutting dependecies while testing.
 *
 * @see [[ICache]]
 */
export declare class NullCache implements ICache {
    /**
     * Retrieves a value from the cache by its unique key.
     * It is recommended to use either string GUIDs (for example: '123456789abc')
     * or unique natural keys prefixed with the functional group (for example:
     * 'pip-services-storage:block-123').
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               unique key to locate the value by in the cache.
     * @param callback          callback function that will be called with an error or the retrieved value.
     *                          Returns <b>null</b> if the value was not found.
     */
    retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void;
    /**
     * Stores a value, identified by its unique key, in the cache.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               unique key to locate the value by in the cache.
     * @param value             the value to store.
     * @param timeout           expiration timeout for the cache entry.
     * @param callback          callback function that will be called with an error or the stored value.
     */
    store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any, value: any) => void): void;
    /**
     * Removes a value from the cache using its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               unique key to locate the value by in the cache.
     * @param callback          callback function that will be called with an error or success.
     */
    remove(correlationId: string, key: string, callback: (err: any) => void): void;
}
