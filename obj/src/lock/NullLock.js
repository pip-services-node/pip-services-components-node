"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NullLock {
    tryAcquireLock(correlationId, key, ttl, callback) {
        callback(null, true);
    }
    acquireLock(correlationId, key, ttl, timeout, callback) {
        callback(null);
    }
    releaseLock(correlationId, key, callback) {
        if (callback)
            callback(null);
    }
}
exports.NullLock = NullLock;
//# sourceMappingURL=NullLock.js.map