"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
/**
 * Abstract class that can be implemented by classes that need to be configurable and
 * manage resoure locking.
 *
 * ### Configuration parameters ###
 *
 * Parameters to pass to the [[configure]] method for component configuration:
 *
 * - "options.retry_timeout" - the amount of time to retry lock acquisition (default is 100).
 */
class Lock {
    constructor() {
        this._retryTimeout = 100;
    }
    /**
     * Configures this object using the parameters provided. Looks for a parameter with the
     * key "options.retry_timeout" and sets it for this object. If the key is not found,
     * the value will default to the value that was previously set for this object.
     *
     * __Configuration parameters:__
     * - "options.retry_timeout" - the amount of time to retry lock acquisition (default is 100).
     *
     * @param config    ConfigParams, containing a "options.retry_timeout" item.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    configure(config) {
        this._retryTimeout = config.getAsIntegerWithDefault("options.retry_timeout", this._retryTimeout);
    }
    //TODO: check timeout vs _retryTimeout
    /**
     * Acquiring a lock for a certain resource, identifiable by the lock's key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               the key to identify the lock by.
     * @param ttl               the lock's time-to-live.
     * @param timeout           the acquisition's retry interval.
     * @param callback          the function to call once the lock has been acquired. Will be called
     *                          with an error if one is raised. If the retry interval times out,
     *                          a [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.conflictexception.html ConflictException]]
     *                          will be returned.
     */
    acquireLock(correlationId, key, ttl, timeout, callback) {
        let retryTime = new Date().getTime() + timeout;
        // Try to get lock first
        this.tryAcquireLock(correlationId, key, ttl, (err, result) => {
            if (err || result) {
                callback(err);
                return;
            }
            // Start retrying
            let interval = setInterval(() => {
                // When timeout expires return false
                let now = new Date().getTime();
                if (now > retryTime) {
                    clearInterval(interval);
                    let err = new pip_services_commons_node_1.ConflictException(correlationId, "LOCK_TIMEOUT", "Acquiring lock " + key + " failed on timeout").withDetails("key", key);
                    callback(err);
                    return;
                }
                this.tryAcquireLock(correlationId, key, ttl, (err, result) => {
                    if (err || result) {
                        clearInterval(interval);
                        callback(err);
                    }
                });
            }, this._retryTimeout);
        });
    }
}
exports.Lock = Lock;
//# sourceMappingURL=Lock.js.map