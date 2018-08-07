"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module log */
/**
 * Enumeration for defining log levels.
 */
var LogLevel;
(function (LogLevel) {
    /** Messages that do not have a log level. */
    LogLevel[LogLevel["None"] = 0] = "None";
    /** Messages that contain information about very severe error events that will presumably cause an abort. */
    LogLevel[LogLevel["Fatal"] = 1] = "Fatal";
    /** Messages that contain information about error events that can still allow a service to continue running. */
    LogLevel[LogLevel["Error"] = 2] = "Error";
    /** Messages that contain information about potentially harmful situations. */
    LogLevel[LogLevel["Warn"] = 3] = "Warn";
    /** Designates informational messages that highlight the progress of the application at coarse-grained level. */
    LogLevel[LogLevel["Info"] = 4] = "Info";
    /** Messages that contain fine-grained informational events that can be useful during debugging. */
    LogLevel[LogLevel["Debug"] = 5] = "Debug";
    /** Messages that contain finer-grained informational events than Debug. */
    LogLevel[LogLevel["Trace"] = 6] = "Trace";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=LogLevel.js.map