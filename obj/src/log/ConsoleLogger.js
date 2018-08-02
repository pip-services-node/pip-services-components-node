"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module log */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const LogLevel_1 = require("./LogLevel");
const Logger_1 = require("./Logger");
const LogLevelConverter_1 = require("./LogLevelConverter");
class ConsoleLogger extends Logger_1.Logger {
    constructor() {
        super();
    }
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