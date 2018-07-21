"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogLevel_1 = require("./LogLevel");
class NullLogger {
    constructor() { }
    getLevel() { return LogLevel_1.LogLevel.None; }
    setLevel(value) { }
    log(level, correlationId, error, message, ...args) { }
    fatal(correlationId, error, message, ...args) { }
    error(correlationId, error, message, ...args) { }
    warn(correlationId, message, ...args) { }
    info(correlationId, message, ...args) { }
    debug(correlationId, message, ...args) { }
    trace(correlationId, message, ...args) { }
}
exports.NullLogger = NullLogger;
//# sourceMappingURL=NullLogger.js.map