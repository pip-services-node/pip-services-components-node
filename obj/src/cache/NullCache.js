"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Null implementation of the [[ICache]] interface. Returns null instead of real values.
 * Can be used for cutting dependecies while testing.
 *
 * @see [[ICache]]
 */
class NullCache {
    /**
     * Null method that will always return null when retrieving key-value pairs
     * from the cache.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to retrieve value by.
     * @param callback          callback function that will always be called with
     *                          null as both the error and result.
     */
    retrieve(correlationId, key, callback) {
        callback(null, null);
    }
    /**
     * Null method that will always return null when storing key-value pairs
     * in the cache.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to store the value by in the cache.
     * @param value             value to be stored in the cache.
     * @param timeout           timeout for storing the key-value pair in the cache.
     * @param callback          callback function that will always be called with
     *                          null as the error and value as the result.
     */
    store(correlationId, key, value, timeout, callback) {
        callback(null, value);
    }
    /**
     * Null method that will always return null when removing key-value pairs
     * from the cache.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to delete key-value pair by.
     * @param callback          callback function that will always be called with null.
     */
    remove(correlationId, key, callback) {
        callback(null);
    }
}
exports.NullCache = NullCache;
//# sourceMappingURL=NullCache.js.map