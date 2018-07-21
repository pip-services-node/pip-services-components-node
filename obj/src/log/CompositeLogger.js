"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Logger_1 = require("./Logger");
class CompositeLogger extends Logger_1.Logger {
    constructor(references = null) {
        super();
        this._loggers = [];
        if (references)
            this.setReferences(references);
    }
    setReferences(references) {
        super.setReferences(references);
        let loggers = references.getOptional(new pip_services_commons_node_1.Descriptor(null, "logger", null, null, null));
        for (var i = 0; i < loggers.length; i++) {
            let logger = loggers[i];
            // Todo: This doesn't work in TS. Redo...
            if (logger != this)
                this._loggers.push(logger);
        }
    }
    write(level, correlationId, error, message) {
        for (let index = 0; index < this._loggers.length; index++)
            this._loggers[index].log(level, correlationId, error, message);
    }
}
exports.CompositeLogger = CompositeLogger;
//# sourceMappingURL=CompositeLogger.js.map