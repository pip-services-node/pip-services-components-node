"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simplifies working with key-value pairs in/from the cache.
 */
class CacheEntry {
    /**
     * @param key       unique key to locate the value by in the cache.
     * @param value     value to be stored in (or retrieved from) the cache.
     * @param timeout   expiration timeout for this cache entry.
     */
    constructor(key, value, timeout) {
        this._key = key;
        this._value = value;
        this._expiration = new Date().getTime() + timeout;
    }
    /**
     * @returns the unique key by which this cache entry's value can be
     *          located in the cache.
     */
    getKey() {
        return this._key;
    }
    /**
     * @returns the value of this cache entry.
     */
    getValue() {
        return this._value;
    }
    /**
     * @returns the expiration timeout for this cache entry.
     */
    getExpiration() {
        return this._expiration;
    }
    /**
     * @param value     the value to be stored in (or retrieved from) the cache by this cache entry's key.
     * @param timeout   expiration timeout for this cache entry.
     */
    setValue(value, timeout) {
        this._value = value;
        this._expiration = new Date().getTime() + timeout;
    }
    /**
     * @returns whether or not this cache entry's timeout has expired.
     */
    isExpired() {
        return this._expiration < new Date().getTime();
    }
}
exports.CacheEntry = CacheEntry;
//# sourceMappingURL=CacheEntry.js.map