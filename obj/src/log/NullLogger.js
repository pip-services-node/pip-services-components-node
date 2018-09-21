"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogLevel_1 = require("./LogLevel");
/**
 * Dummy implementation of the [[ILogger]] interface. Methods do not contain any logic and
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
     * Retrieves the [[LogLevel]] that is currently set.
     *
     * @returns this logger's LogLevel. Dummy implementation
     * 			will always return <code>LogLevel.None</code>.
     *
     * @see [[LogLevel]]
     */
    getLevel() { return LogLevel_1.LogLevel.None; }
    /**
     * Sets this logger's [[LogLevel]].
     *
     * @param value     the LogLevel to set this logger to.
     *
     * @see [[LogLevel]]
     */
    setLevel(value) { }
    /**
     * Logs a message using the given [[LogLevel]] and parameters.
     *
     * @param level             the LogLevel to use.
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             the Error to include in the log entry for fatal and error logs.
     * @param message           the message to log or the format string to use for formatting.
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     */
    log(level, correlationId, error, message, ...args) { }
    /**
     * Logs a message using the [[LogLevel.Fatal fatal]] log level.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             the Error to include in the log entry.
     * @param message           the message to log as fatal or the format string to use for formatting.
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     *
     * @see [[LogLevel]]
     */
    fatal(correlationId, error, message, ...args) { }
    /**
     * Logs a message using the [[LogLevel.Error error]] log level.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             the Error to include in the log entry.
     * @param message           the message to log as error or the format string to use for formatting.
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     *
     * @see [[LogLevel]]
     */
    error(correlationId, error, message, ...args) { }
    /**
     * Logs a message using the [[LogLevel.Warn warn]] log level.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param message           the message to log as warn or the format string to use for formatting.
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     *
     * @see [[LogLevel]]
     */
    warn(correlationId, message, ...args) { }
    /**
     * Logs a message using the [[LogLevel.Info info]] log level.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param message           the message to log as info or the format string to use for formatting.
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     *
     * @see [[LogLevel]]
     */
    info(correlationId, message, ...args) { }
    /**
     * Logs a message using the [[LogLevel.Debug debug]] log level.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param message           the message to log as debug or the format string to use for formatting.
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     *
     * @see [[LogLevel]]
     */
    debug(correlationId, message, ...args) { }
    /**
     * Logs a message using the [[LogLevel.Trace trace]] log level.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param message           the message to log as trace or the format string to use for formatting.
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     *
     * @see [[LogLevel]]
     */
    trace(correlationId, message, ...args) { }
}
exports.NullLogger = NullLogger;
//# sourceMappingURL=NullLogger.js.map