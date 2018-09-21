/** @module log */
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';
/**
 * Helper class for grouping multiple [[ILogger loggers]] together and writing to all
 * of them at once using a single method call.
 *
 * ### References ###
 *
 * Loggers and a context can be referenced by passing the following references
 * to the object's [[setReferences]] method:
 *
 * - Loggers: <code>"\*:logger:\*:\*:1.0"</code>;
 * - Context (source): <code>"\*:context-info:\*:\*:1.0"</code>.
 *
 * @see [[ILogger]]
 *
 * ### Example ###
 *
 * CompositeLogger object creation and usage:
 *
 *      public MyMethod(references: IReferences) {
 *          let logger = new CompositeLogger();
 *          logger.setReferences(references);
 *          ...
 *
 *          logger.info(...);
 *          ...
 *          logger.error(...);
 *      }
 */
export declare class CompositeLogger extends Logger implements IReferenceable {
    private readonly _loggers;
    /**
     * Creates a new CompositeLogger object. If "logger" references are given, they will be
     * set in the new object. If omitted - they can be set later on using [[setReferences]].
     *
     * @param references    the "logger" references to set.
     *
     * @see [[setReferences]]
     */
    constructor(references?: IReferences);
    /**
     * Set a context reference and adds all logger references to this object's list of loggers.
     *
     * __References:__
     * - Loggers: <code>"\*:logger:\*:\*:1.0"</code>;
     * - Context (source): <code>"\*:context-info:\*:\*:1.0"</code>.
     *
     * @param references    an IReferences object, containing references to a context and to
     *                      the loggers that are to be added.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */
    setReferences(references: IReferences): void;
    /**
     * Calls the <code>log</code> method for all included loggers. The <code>log</code>
     * method writes a message to the logger's log using the provided level, correlation id,
     * error, and message.
     *
     * @param level             the [[LogLevel]] of the log entry.
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             the Error to include in the log entry.
     * @param message           the message to log.
     *
     * @see [[Logger.write]]
     * @see [[LogLevel]]
     */
    protected write(level: LogLevel, correlationId: string, error: Error, message: string): void;
}
