"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module lock */
const Lock_1 = require("./Lock");
/**
 * Stores a registry of locks in memory. A lock contains a string key (by which
 * the resource that is being locked can be identified) and the lock's
 * time to live (after which the lock is considered to be expired).
 */
class MemoryLock extends Lock_1.Lock {
    constructor() {
        super(...arguments);
        this._locks = {};
    }
    /**
     * Attempts to acquire a lock for the resource that is identified by the given key.
     *
     * @param correlationId     not used.
     * @param key               the key to identify the lock by.
     * @param ttl               the lock's time-to-live.
     * @param callback          the function that will be called with the result of the attempt or
     *                          with an error (if one is raised).
     */
    tryAcquireLock(correlationId, key, ttl, callback) {
        let expireTime = this._locks[key];
        let now = new Date().getTime();
        if (expireTime == null || expireTime < now) {
            this._locks[key] = now + ttl;
            callback(null, true);
        }
        else {
            callback(null, false);
        }
    }
    /**
     * Releases the lock with the given key.
     *
     * @param correlationId     not used.
     * @param key               the key of the lock that is to be released.
     * @param callback          (optional) the function to call once the lock has been released. Will be called
     *                          with <code>null</code>.
     */
    releaseLock(correlationId, key, callback) {
        delete this._locks[key];
        if (callback)
            callback(null);
    }
}
exports.MemoryLock = MemoryLock;
//# sourceMappingURL=MemoryLock.js.map