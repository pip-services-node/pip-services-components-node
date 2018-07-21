"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lock_1 = require("./Lock");
class MemoryLock extends Lock_1.Lock {
    constructor() {
        super(...arguments);
        this._locks = {};
    }
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
    releaseLock(correlationId, key, callback) {
        delete this._locks[key];
        if (callback)
            callback(null);
    }
}
exports.MemoryLock = MemoryLock;
//# sourceMappingURL=MemoryLock.js.map