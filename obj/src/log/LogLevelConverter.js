"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module log */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const LogLevel_1 = require("./LogLevel");
/**
 * Helper class that contains static methods for converting [[LogLevel LogLevels]]
 * to and from string values.
 *
 * @see [[LogLevel]]
 */
class LogLevelConverter {
    /**
     * Static method that converts integers and strings to their corresponding [[LogLevel LogLevels]].
     *
     * @param value         the integer or string value to convert.
     *                      Example values: 0/"NOTHING"/"NONE"; 1/"FATAL"; 6/"TRACE".
     * @param defaultValue  the default LogLevel to use if conversion is not possible.
     *                      Defaults to LogLevel.Info if omitted.
     *
     * @returns the LogLevel that corresponds to the given value.
     *
     * @see [[LogLevel]]
     */
    static toLogLevel(value, defaultValue = LogLevel_1.LogLevel.Info) {
        if (value == null)
            return LogLevel_1.LogLevel.Info;
        value = pip_services_commons_node_1.StringConverter.toString(value).toUpperCase();
        if ("0" == value || "NOTHING" == value || "NONE" == value)
            return LogLevel_1.LogLevel.None;
        else if ("1" == value || "FATAL" == value)
            return LogLevel_1.LogLevel.Fatal;
        else if ("2" == value || "ERROR" == value)
            return LogLevel_1.LogLevel.Error;
        else if ("3" == value || "WARN" == value || "WARNING" == value)
            return LogLevel_1.LogLevel.Warn;
        else if ("4" == value || "INFO" == value)
            return LogLevel_1.LogLevel.Info;
        else if ("5" == value || "DEBUG" == value)
            return LogLevel_1.LogLevel.Debug;
        else if ("6" == value || "TRACE" == value)
            return LogLevel_1.LogLevel.Trace;
        else
            return defaultValue;
    }
    /**
     * Static method that converts a [[LogLevel]] to its string
     * equivalent (its name in CAPS).
     *
     * @param level     the LogLevel to convert.
     * @returns the LogLevel's name or "UNDEF" (if the level is undefined).
     *
     * @see [[LogLevel]]
     */
    static toString(level) {
        if (level == LogLevel_1.LogLevel.Fatal)
            return "FATAL";
        if (level == LogLevel_1.LogLevel.Error)
            return "ERROR";
        if (level == LogLevel_1.LogLevel.Warn)
            return "WARN";
        if (level == LogLevel_1.LogLevel.Info)
            return "INFO";
        if (level == LogLevel_1.LogLevel.Debug)
            return "DEBUG";
        if (level == LogLevel_1.LogLevel.Trace)
            return "TRACE";
        return "UNDEF";
    }
    /**
     * Static method that converts a [[LogLevel]] to its numeric
     * equivalent. Fatal is 1 and Trace is 6.
     *
     * @param level     the LogLevel to convert.
     * @returns the LogLevel as an integer.
     *
     * @see [[LogLevel]]
     */
    static toInteger(level) {
        if (level == LogLevel_1.LogLevel.Fatal)
            return 1;
        if (level == LogLevel_1.LogLevel.Error)
            return 2;
        if (level == LogLevel_1.LogLevel.Warn)
            return 3;
        if (level == LogLevel_1.LogLevel.Info)
            return 4;
        if (level == LogLevel_1.LogLevel.Debug)
            return 5;
        if (level == LogLevel_1.LogLevel.Trace)
            return 6;
        return 0;
    }
}
exports.LogLevelConverter = LogLevelConverter;
//# sourceMappingURL=LogLevelConverter.js.map