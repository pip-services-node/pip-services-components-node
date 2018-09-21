import { ConfigParams } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
/**
 * Abstract logger that captures and formats log messages.
 * Child classes take the captured messages and write them to their specific destinations.
 *
 * ### Configuration parameters ###
 *
 * Parameters to pass to the [[configure]] method for component configuration:
 *
 * - level:             maximum log level to capture
 * - source:            source (context) name
 *
 * ### References ###
 *
 * - *:context-info:*:*:1.0     (optional) [[ContextInfo]] to detect the context id and specify counters source
 *
 * @see [[ILogger]]
 */
export declare abstract class Logger implements ILogger, IReconfigurable, IReferenceable {
    protected _level: LogLevel;
    protected _source: string;
    /**
     * Creates a new instance of the logger.
     */
    protected constructor();
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references: IReferences): void;
    /**
     * Gets the maximum log level.
     * Messages with higher log level are filtered out.
     *
     * @returns the maximum log level.
     */
    getLevel(): LogLevel;
    /**
     * Set the maximum log level.
     *
     * @param value     a new maximum log level.
     */
    setLevel(value: LogLevel): void;
    /**
     * Gets the source (context) name.
     *
     * @returns the source (context) name.
     */
    getSource(): string;
    /**
     * Sets the source (context) name.
     *
     * @param value     a new source (context) name.
     */
    setSource(value: string): void;
    /**
     * Writes a log message to the logger destination.
     *
     * @param level             a log level.
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             an error object associated with this message.
     * @param message           a human-readable message to log.
     */
    protected abstract write(level: LogLevel, correlationId: string, error: Error, message: string): void;
    /**
     * Formats the log message and writes it to the logger destination.
     *
     * @param level             a log level.
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             an error object associated with this message.
     * @param message           a human-readable message to log.
     * @param args              arguments to parameterize the message.
     */
    protected formatAndWrite(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void;
    /**
     * Logs a message at specified log level.
     *
     * @param level             a log level.
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             an error object associated with this message.
     * @param message           a human-readable message to log.
     * @param args              arguments to parameterize the message.
     */
    log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void;
    /**
     * Logs fatal (unrecoverable) message that caused the process to crash.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             an error object associated with this message.
     * @param message           a human-readable message to log.
     * @param args              arguments to parameterize the message.
     */
    fatal(correlationId: string, error: Error, message: string, ...args: any[]): void;
    /**
     * Logs recoverable application error.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param error             an error object associated with this message.
     * @param message           a human-readable message to log.
     * @param args              arguments to parameterize the message.
     */
    error(correlationId: string, error: Error, message: string, ...args: any[]): void;
    /**
     * Logs a warning that may or may not have a negative impact.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param message           a human-readable message to log.
     * @param args              arguments to parameterize the message.
     */
    warn(correlationId: string, message: string, ...args: any[]): void;
    /**
     * Logs an important information message
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param message           a human-readable message to log.
     * @param args              arguments to parameterize the message.
     */
    info(correlationId: string, message: string, ...args: any[]): void;
    /**
     * Logs a high-level debug information for troubleshooting.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param message           a human-readable message to log.
     * @param args              arguments to parameterize the message.
     */
    debug(correlationId: string, message: string, ...args: any[]): void;
    /**
     * Logs a low-level debug information for troubleshooting.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param message           a human-readable message to log.
     * @param args              arguments to parameterize the message.
     */
    trace(correlationId: string, message: string, ...args: any[]): void;
    /**
     * Composes an human-readable error description
     *
     * @param error     an error to format.
     * @returns a human-reable error description.
     */
    protected composeError(error: Error): string;
}
