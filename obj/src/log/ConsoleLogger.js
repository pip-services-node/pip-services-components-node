"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module log */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const LogLevel_1 = require("./LogLevel");
const Logger_1 = require("./Logger");
const LogLevelConverter_1 = require("./LogLevelConverter");
/**
 * Used to write log entries to the console.
 *
 * @see [[Logger]]
 */
class ConsoleLogger extends Logger_1.Logger {
    /**
     * Creates a new ConsoleLogger object.
     */
    constructor() {
        super();
    }
    /**
     * Writes a log entry to the console using the provided level, correlation id, error, and message.
     *
     * @param level             the LogLevel of the log entry. If it is less than the level set
     *                          in this logger, then the message will not be logged.
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param ex                the Exception (Error) to include in the log entry.
     * @param message           the message to log.
     */
    write(level, correlationId, ex, message) {
        if (this.getLevel() < level)
            return;
        let result = '[';
        result += correlationId != null ? correlationId : "---";
        result += ':';
        result += LogLevelConverter_1.LogLevelConverter.toString(level);
        result += ':';
        result += pip_services_commons_node_1.StringConverter.toString(new Date());
        result += "] ";
        result += message;
        if (ex != null) {
            if (message.length == 0)
                result += "Error: ";
            else
                result += ": ";
            result += this.composeError(ex);
        }
        if (level == LogLevel_1.LogLevel.Fatal || level == LogLevel_1.LogLevel.Error || level == LogLevel_1.LogLevel.Warn)
            console.error(result);
        else
            console.log(result);
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map