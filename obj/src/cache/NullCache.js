"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dummy implementation of the [[ICache]] interface. Returns null instead of real values.
 * Can be used for cutting dependecies while testing.
 *
 * @see [[ICache]]
 */
class NullCache {
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
    retrieve(correlationId, key, callback) {
        callback(null, null);
    }
    /**
     * Stores a value, identified by its unique key, in the cache.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               unique key to locate the value by in the cache.
     * @param value             the value to store.
     * @param timeout           expiration timeout for the cache entry.
     * @param callback          callback function that will be called with an error or the stored value.
     */
    store(correlationId, key, value, timeout, callback) {
        callback(null, value);
    }
    /**
     * Removes a value from the cache using its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               unique key to locate the value by in the cache.
     * @param callback          callback function that will be called with an error or success.
     */
    remove(correlationId, key, callback) {
        callback(null);
    }
}
exports.NullCache = NullCache;
//# sourceMappingURL=NullCache.js.map