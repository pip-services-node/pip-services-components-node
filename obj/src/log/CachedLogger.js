"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Logger_1 = require("./Logger");
const LogLevelConverter_1 = require("./LogLevelConverter");
/**
 * Abstract class that can be used to create loggers that
 * write [[LogMessage log messages]] to the cache.
 *
 * @see [[Logger]]
 * @see [[LogMessage]]
 */
class CachedLogger extends Logger_1.Logger {
    /**
     * Creates a new CachedLogger object.
     */
    constructor() {
        super();
        this._cache = [];
        this._updated = false;
        this._lastDumpTime = new Date().getTime();
        this._maxCacheSize = 100;
        this._interval = 10000;
    }
    /**
     * Writes a [[LogMessage]] to the cache using the provided level, correlation id, error, and message.
     * The [[LogMessage LogMessage's]] time and source will be set to the current time and this logger's
     * source, respectively.
     *
     * @param level             the [[LogLevel]] of the log entry.
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param ex                the Exception (Error) to include in the log entry.
     * @param message           the message to log.
     *
     * @see [[LogMessage]]
     * @see [[LogLevel]]
     */
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
    /**
     * Configures this object using the parameters provided. Calls Logger's [[Logger.configure configure]]
     * and additionally looks for parameters with the keys "options.interval" and "options.max_cache_size".
     * If they are found, then they will be set for this object. Otherwise, the corresponding values will
     * default to the values that were previously set for this object.
     *
     * @param config    ConfigParams, containing "options.interval" and/or
     *                  "options.max_cache_size" items.
     *
     * @see [[Logger.configure]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    configure(config) {
        super.configure(config);
        this._interval = config.getAsLongWithDefault("options.interval", this._interval);
        this._maxCacheSize = config.getAsIntegerWithDefault("options.max_cache_size", this._maxCacheSize);
    }
    /**
     * Removes all [[LogMessage LogMessages]] from this object's cache.
     */
    clear() {
        this._cache = [];
        this._updated = false;
    }
    /**
     * Dumps the [[LogMessage LogMessages]] that are stored in this object's
     * cache to memory.
     *
     * @see [[save]]
     */
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
    /**
     * Checks whether or not the update interval has passed (since the last
     * [[dump]] was performed) and, if it has, performs a [[dump]].
     *
     * @see [[dump]]
     */
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