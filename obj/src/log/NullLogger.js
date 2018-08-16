"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogLevel_1 = require("./LogLevel");
/**
 * Null implementation of the [[ILogger]] interface. Methods do not contain any logic and
 * simply accept the parameters passed to them. Can be used to cut dependecies while testing.
 *
 * @see [[ILogger]]
 */
class NullLogger {
    /**
     * Creates a new NullLogger object.
     */
    constructor() { }
    /**
     * Null call to the [[ILogger.getLevel getLevel]] method.
     *
     * @returns the None LogLevel
     *
     * @see [[LogLevel.None]]
     */
    getLevel() { return LogLevel_1.LogLevel.None; }
    /**
     * Null call to the [[ILogger.setLevel setLevel]] method.
     *
     * @param value		not used.
     */
    setLevel(value) { }
    /**
     * Null call to the [[ILogger.log log]] method.
     *
     * @param level				not used.
     * @param correlationId 	not used.
     * @param error				not used.
     * @param message 			not used.
     * @param args				not used.
     */
    log(level, correlationId, error, message, ...args) { }
    /**
     * Null call to the [[ILogger.fatal fatal]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    fatal(correlationId, error, message, ...args) { }
    /**
     * Null call to the [[ILogger.error error]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    error(correlationId, error, message, ...args) { }
    /**
     * Null call to the [[ILogger.warn warn]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    warn(correlationId, message, ...args) { }
    /**
     * Null call to the [[ILogger.info info]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    info(correlationId, message, ...args) { }
    /**
     * Null call to the [[ILogger.debug debug]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    debug(correlationId, message, ...args) { }
    /**
     * Null call to the [[ILogger.trace trace]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    trace(correlationId, message, ...args) { }
}
exports.NullLogger = NullLogger;
//# sourceMappingURL=NullLogger.js.map