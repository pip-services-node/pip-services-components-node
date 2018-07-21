"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const LogLevel_1 = require("./LogLevel");
class LogLevelConverter {
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