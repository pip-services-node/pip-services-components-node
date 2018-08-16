"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module log */
/** @hidden */
let util = require('util');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const LogLevel_1 = require("./LogLevel");
const LogLevelConverter_1 = require("./LogLevelConverter");
class Logger {
    constructor() {
        this._level = LogLevel_1.LogLevel.Info;
        this._source = null;
    }
    configure(config) {
        this._level = LogLevelConverter_1.LogLevelConverter.toLogLevel(config.getAsObject("level"), this._level);
        this._source = config.getAsStringWithDefault("source", this._source);
    }
    setReferences(references) {
        let contextInfo = references.getOneOptional(new pip_services_commons_node_1.Descriptor("pip-services", "context-info", "*", "*", "1.0"));
        if (contextInfo != null && this._source == null) {
            this._source = contextInfo.name;
        }
    }
    getLevel() {
        return this._level;
    }
    setLevel(value) {
        this._level = value;
    }
    getSource() {
        return this._source;
    }
    setSource(value) {
        this._source = value;
    }
    formatAndWrite(level, correlationId, error, message, ...args) {
        message = message != null ? message : "";
        if (args != null && args.length > 0) {
            // message = message.replace(/{(\d+)}/g, function (match, number) {
            //     return typeof args[number] != 'undefined' ? args[number] : match;
            // });
            message = util.format(message, ...args);
        }
        this.write(level, correlationId, error, message);
    }
    log(level, correlationId, error, message, ...args) {
        this.formatAndWrite(level, correlationId, error, message, ...args);
    }
    fatal(correlationId, error, message, ...args) {
        this.formatAndWrite(LogLevel_1.LogLevel.Fatal, correlationId, error, message, ...args);
    }
    error(correlationId, error, message, ...args) {
        this.formatAndWrite(LogLevel_1.LogLevel.Error, correlationId, error, message, ...args);
    }
    warn(correlationId, message, ...args) {
        this.formatAndWrite(LogLevel_1.LogLevel.Warn, correlationId, null, message, ...args);
    }
    info(correlationId, message, ...args) {
        this.formatAndWrite(LogLevel_1.LogLevel.Info, correlationId, null, message, ...args);
    }
    debug(correlationId, message, ...args) {
        this.formatAndWrite(LogLevel_1.LogLevel.Debug, correlationId, null, message, ...args);
    }
    trace(correlationId, message, ...args) {
        this.formatAndWrite(LogLevel_1.LogLevel.Trace, correlationId, null, message, ...args);
    }
    composeError(error) {
        let builder = "";
        builder += error.message;
        let appError = error;
        if (appError.cause) {
            builder += " Caused by: ";
            builder += appError.cause;
        }
        if (error.stack) {
            builder += " Stack trace: ";
            builder += error.stack;
        }
        return builder;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map