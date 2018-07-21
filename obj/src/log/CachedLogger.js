"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Logger_1 = require("./Logger");
const LogLevelConverter_1 = require("./LogLevelConverter");
class CachedLogger extends Logger_1.Logger {
    constructor() {
        super();
        this._cache = [];
        this._updated = false;
        this._lastDumpTime = new Date().getTime();
        this._maxCacheSize = 100;
        this._interval = 10000;
    }
    write(level, correlationId, ex, message) {
        let error = ex != null ? pip_services_commons_node_1.ErrorDescriptionFactory.create(ex) : null;
        let logMessage = {
            time: new Date(),
            level: LogLevelConverter_1.LogLevelConverter.toString(level),
            source: this._source,
            correlation_id: correlationId,
            error: error,
            message: message
        };
        this._cache.push(logMessage);
        this.update();
    }
    configure(config) {
        super.configure(config);
        this._interval = config.getAsLongWithDefault("options.interval", this._interval);
        this._maxCacheSize = config.getAsIntegerWithDefault("options.max_cache_size", this._maxCacheSize);
    }
    clear() {
        this._cache = [];
        this._updated = false;
    }
    dump() {
        if (this._updated) {
            if (!this._updated)
                return;
            let messages = this._cache;
            this._cache = [];
            this.save(messages, (err) => {
                if (err) {
                    // Adds messages back to the cache
                    messages.push(...this._cache);
                    this._cache = messages;
                    // Truncate cache
                    let deleteCount = this._cache.length - this._maxCacheSize;
                    if (deleteCount > 0)
                        this._cache.splice(0, deleteCount);
                }
            });
            this._updated = false;
            this._lastDumpTime = new Date().getTime();
        }
    }
    update() {
        this._updated = true;
        let now = new Date().getTime();
        if (now > this._lastDumpTime + this._interval) {
            try {
                this.dump();
            }
            catch (ex) {
                // Todo: decide what to do
            }
        }
    }
}
exports.CachedLogger = CachedLogger;
//# sourceMappingURL=CachedLogger.js.map