"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CacheEntry_1 = require("./CacheEntry");
/**
 * Provides local in-memory cache support.
 *
 * @see {ICache}
 */
class MemoryCache {
    /**
     * Creates an instance of this local in-memory cache component.
     */
    constructor() {
        this._cache = {};
        this._count = 0;
        //milliseconds
        this._timeout = MemoryCache._defaultTimeout;
        this._maxSize = MemoryCache._defaultMaxSize;
    }
    /**
     * Sets this object's 'timeout' and 'max_size' to the values that are
     * set in the passed configuration parameters.
     *
     * @param config the component's configuration parameters.
     * @throws  MicroserviceError when component is in illegal state
     *          or configuration validation fails.
     *
     * @see ConfigParams
     * @see IConfigurable
     */
    configure(config) {
        this._timeout = config.getAsLongWithDefault("timeout", this._timeout);
        this._maxSize = config.getAsLongWithDefault("max_size", this._maxSize);
    }
    /**
     * Cleans up cache from obsolete values and shrinks the cache
     * to fit into allowed max size by dropping values that were not
     * accessed for a long time.
     */
    cleanup() {
        let oldest = null;
        let now = new Date().getTime();
        this._count = 0;
        // Cleanup obsolete entries and find the oldest
        for (var prop in this._cache) {
            let entry = this._cache[prop];
            // Remove obsolete entry
            if (entry.isExpired()) {
                delete this._cache[prop];
            }
            // Count the remaining entry 
            else {
                this._count++;
                if (oldest == null || oldest.getExpiration() > entry.getExpiration())
                    oldest = entry;
            }
        }
        // Remove the oldest if cache size exceeded maximum
        if (this._count > this._maxSize && oldest != null) {
            delete this._cache[oldest.getKey()];
            this._count--;
        }
    }
    /**
     * Retrieves a value from the cache by its unique key.
     * It is recommended to use either string GUIDs (for example: '123456789abc')
     * or unique natural keys prefixed with the functional group (for example:
     * 'pip-services-storage:block-123').
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               unique key to locate the value by in the cache.
     * @param callback          callback function that will be called with an error or the retrieved value.
     *                          Returns <b>null</b> if the value was not found.
     */
    retrieve(correlationId, key, callback) {
        if (key == null) {
            let err = new Error('Key cannot be null');
            callback(err, null);
            return;
        }
        // Get entry from the cache
        let entry = this._cache[key];
        // Cache has nothing
        if (entry == null) {
            callback(null, null);
            return;
        }
        // Remove entry if expiration set and entry is expired
        if (this._timeout > 0 && entry.isExpired()) {
            delete this._cache[key];
            this._count--;
            callback(null, null);
            return;
        }
        callback(null, entry.getValue());
    }
    /**
     * Stores value identified by unique key in the cache.
     * Cache entry's expiration timeout is configured in the component's options.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               unique key to locate the value by in the cache.
     * @param value             value to store.
     * @param callback          callback function that will be called with an error or the stored value.
     */
    store(correlationId, key, value, timeout, callback) {
        if (key == null) {
            let err = new Error('Key cannot be null');
            if (callback)
                callback(err, null);
            return;
        }
        // Get the entry
        let entry = this._cache[key];
        // Shortcut to remove entry from the cache
        if (value == null) {
            if (entry != null) {
                delete this._cache[key];
                this._count--;
            }
            if (callback)
                callback(null, value);
            return;
        }
        timeout = timeout != null && timeout > 0 ? timeout : this._timeout;
        // Update the entry
        if (entry) {
            entry.setValue(value, timeout);
        }
        // Or create a new entry 
        else {
            entry = new CacheEntry_1.CacheEntry(key, value, timeout);
            this._cache[key] = entry;
            this._count++;
        }
        // Clean up the cache
        if (this._maxSize > 0 && this._count > this._maxSize)
            this.cleanup();
        if (callback)
            callback(null, value);
    }
    /**
     * Removes a value from the cache using its key.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               unique key to locate the value by in the cache.
     * @param callback          callback function that will be called with an error or success.
     */
    remove(correlationId, key, callback) {
        if (key == null) {
            let err = new Error('Key cannot be null');
            if (callback)
                callback(err);
            return;
        }
        // Get the entry
        let entry = this._cache[key];
        // Remove entry from the cache
        if (entry != null) {
            delete this._cache[key];
            this._count--;
        }
        if (callback)
            callback(null);
    }
}
//milliseconds
MemoryCache._defaultTimeout = 60000;
MemoryCache._defaultMaxSize = 1000;
exports.MemoryCache = MemoryCache;
//# sourceMappingURL=MemoryCache.js.map