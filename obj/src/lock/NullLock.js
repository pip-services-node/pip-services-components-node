"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Null implementation of the [[ILock]] interface. Methods do not contain any logic and
 * simply accept the parameters passed to them. Can be used to cut dependecies while testing.
 *
 * @see [[ILock]]
 */
class NullLock {
    /**
     * Null call to the [[ILock.tryAcquireLock tryAcquireLock]] method.
     *
     * @param correlationId     not used.
     * @param key               not used.
     * @param ttl               not used.
     * @param callback          will be called with <code>null, true<code>.
     */
    tryAcquireLock(correlationId, key, ttl, callback) {
        callback(null, true);
    }
    /**
     * Null call to the [[ILock.acquireLock acquireLock]] method.
     *
     * @param correlationId     not used.
     * @param key               not used.
     * @param ttl               not used.
     * @param timeout           not used.
     * @param callback          will be called with <code>null<code>.
     */
    acquireLock(correlationId, key, ttl, timeout, callback) {
        callback(null);
    }
    /**
     * Null call to the [[ILock.releaseLock releaseLock]] method.
     *
     * @param correlationId     not used.
     * @param key               not used.
     * @param callback          if given - will be called with <code>null<code>.
     */
    releaseLock(correlationId, key, callback) {
        if (callback)
            callback(null);
    }
}
exports.NullLock = NullLock;
//# sourceMappingURL=NullLock.js.map