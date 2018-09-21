/** @module cache */
/**
 * Interface that can be used for creating various distributed caches. We can save
 * an object to cache and retrieve it by its key, using various implementations.
 *
 * ### Example ###
 *
 * Example implementation of the ICache interface:
 *
 *     export class MyCache implements ICache {
 *         public retrieve(correlationId: string, key: string,
 *            callback: (err: any, value: any) => void): void {...}
 *
 *         public store(correlationId: string, key: string, value: any, timeout: number,
 *            callback?: (err: any) => void): void {...}
 *
 *         public remove(correlationId: string, key: string,
 *            callback?: (err: any) => void) {...}
 *
 *         ...
 *     }
 */
export interface ICache {
    /**
     * Abstract method that will contain the logic for retrieving key-value pairs
     * from the cache.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               key to retrieve value by.
     * @param callback          callback function that will be called with an error
     *                          or the retrieved value.
     */
    retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void;
    /**
     * Abstract method that will contain the logic for storing key-value pairs
     * in the cache.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               key to store the value by in the cache.
     * @param value             the value to store in the cache.
     * @param timeout           expiration timeout for the cache entry.
     * @param callback          (optional) callback function that will be called with
     *                          an error (if one is raised).
     */
    store(correlationId: string, key: string, value: any, timeout: number, callback?: (err: any) => void): void;
    /**
     * Abstract method that will contain the logic for removing key-value pairs
     * from the cache.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               key to delete key-value pair by.
     * @param callback          (optional) callback function that will be called with
     *                          an error (if one is raised).
     */
    remove(correlationId: string, key: string, callback?: (err: any) => void): any;
}
