"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Logger_1 = require("./Logger");
/**
 * Helper class for grouping multiple [[ILogger loggers]] together and writing to all
 * of them at once using a single method call.
 *
 * @see [[ILogger]]
 */
class CompositeLogger extends Logger_1.Logger {
    /**
     * Creates a new CompositeLogger object. If "logger" references are given, they will be
     * set in the new object. If omitted - they can be set later on using [[setReferences]].
     *
     * @param references    the "logger" references to set.
     *
     * @see [[setReferences]]
     */
    constructor(references = null) {
        super();
        this._loggers = [];
        if (references)
            this.setReferences(references);
    }
    /**
     * Retrieves all "logger" references from the passed references and adds them to this
     * object's list of loggers.
     *
     * @param references    the "logger" references to set.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package.)
     */
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
    /**
     * Calls the <code>log</code> method for all included loggers. The <code>log</code>
     * method writes a message to the logger's log using the provided level, correlation id,
     * error, and message.
     *
     * @param level             the [[LogLevel]] of the log entry.
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param error             the Error to include in the log entry.
     * @param message           the message to log.
     *
     * @see [[Logger.write]]
     * @see [[LogLevel]]
     */
    write(level, correlationId, error, message) {
        for (let index = 0; index < this._loggers.length; index++)
            this._loggers[index].log(level, correlationId, error, message);
    }
}
exports.CompositeLogger = CompositeLogger;
//# sourceMappingURL=CompositeLogger.js.map