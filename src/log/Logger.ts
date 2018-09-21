/** @module log */
/** @hidden */ 
let util = require('util');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { IReconfigurable } from 'pip-services-commons-node';
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
import { LogLevelConverter } from './LogLevelConverter';
import { ContextInfo } from '../info/ContextInfo';

/**
 * Abstract class for creating loggers that are configurable, have a source (reference a context), and 
 * are capable of logging messages of various [[LogLevel log levels]].
 *
 * ### Configuration parameters ###
 * 
 * Parameters to pass to the [[configure]] method for component configuration:
 *  
 * - "level" - the [[LogLevel]] to set (default is LogLevel.Info);
 * - "source" - the logger's source.
 * 
 * ### References ###
 * 
 * A context can be referenced by passing the following reference
 * to the object's [[setReferences]] method:
 * 
 * - context: <code>"\*:context-info:\*:\*:1.0"</code>;
 * 
 * @see [[ILogger]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferenceable.html IReferenceable]]
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.ireconfigurable.html IReconfigurable]]
 * 
 * ### Example ###
 * 
 * Example usage:
 * 
 *     public MyMethod() {
 *         let logger = new Logger();
 *         logger.log(LogLevel.Error, "123", null, "error...");
 *         ...
 *     }
 */
export abstract class Logger implements ILogger, IReconfigurable, IReferenceable {
    protected _level: LogLevel = LogLevel.Info;
    protected _source: string = null;

    /**
     * Creates a new Logger object.
     */
    protected constructor() { }

    /**
     * Configures this object using the parameters provided. Looks for parameters with the 
     * keys "level" and "source" and sets them for this object. If a key is not found, 
     * the corresponding value will default to the value that was previously set for this object.
     * 
     * __Configuration parameters:__
     * - "level" - the [[LogLevel]] to set (default is LogLevel.Info);
     * - "source" - the logger's source.
     * 
     * @param config    ConfigParams, containing "level" and/or "source" items.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public configure(config: ConfigParams): void {
        this._level = LogLevelConverter.toLogLevel(
            config.getAsObject("level"),
            this._level
        );
        this._source = config.getAsStringWithDefault("source", this._source);
    }

    /**
     * Retrieves a context-info reference from the passed references and, if this object's
     * <code>source</code> has not already been set, sets the context-info as this object's source.
     * 
     * @param references    an IReferences object, containing the "context-info" reference to set.
     * 
     * @see [[ContextInfo]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */

    /**
     * Sets a reference to this logger's source (context).
     * 
     * __References:__
     * - context: <code>"\*:context-info:\*:\*:1.0"</code>;
     * 
     * @param references    an IReferences object, containing a reference to a context.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */
    public setReferences(references: IReferences) {
        let contextInfo = references.getOneOptional<ContextInfo>(
            new Descriptor("pip-services", "context-info", "*", "*", "1.0"));
        if (contextInfo != null && this._source == null) {
            this._source = contextInfo.name;
        }
    }

    /**
     * Retrieves the [[LogLevel]] that is currently set.
     * 
     * @returns this logger's LogLevel.
     * 
     * @see [[LogLevel]]
     */
    public getLevel(): LogLevel {
        return this._level;
    }

    /**
     * Sets this logger's [[LogLevel]].
     * 
     * @param value     the LogLevel to set this logger to.
     * 
     * @see [[LogLevel]]
     */
    public setLevel(value: LogLevel): void {
        this._level = value;
    }

    /**
     * Retrieves the source (context) for which this logger is logging.
     * 
     * @returns this logger's source (context).
     */
    public getSource(): string {
        return this._source;
    }

    /**
     * Sets the source (context) for which this logger will be logging.
     * 
     * @param value     the source (context) to set.
     */
    public setSource(value: string): void {
        this._source = value;
    }
    
    /**
     * Abstract method that will contain the logic for writing a message to the log using the 
     * provided level, correlation id, error, and message.
     * 
     * @param level             the LogLevel of the log entry.
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param error             the Error to include in the log entry.
     * @param message           the message to log.
     */
    protected abstract write(level: LogLevel, correlationId: string, error: Error, message: string): void;

    /**
     * If <code>message</code> is a <code>printf</code>-like format string, then this method formats it 
     * using the provided arguments and calls [[write]] with the newly formatted string.
     * 
     * @param level             the LogLevel to use.
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param error             the Error to include in the log entry for fatal and error logs.
     * @param message           the message to log or the format string to use for formatting.
     * @param args              the arguments to format <code>message</code> with.
     * 
     * @see [[LogLevel]]
     * @see [[write]]
     */
    protected formatAndWrite(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void {
        message = message != null ? message : "";
        if (args != null && args.length > 0) {
            // message = message.replace(/{(\d+)}/g, function (match, number) {
            //     return typeof args[number] != 'undefined' ? args[number] : match;
            // });
            message = util.format(message, ...args);
        }

        this.write(level, correlationId, error, message);
    }

    /**
     * Logs a message using the given [[LogLevel]] and parameters. Uses this class's [[formatAndWrite]]
     * method.
     * 
     * @param level             the LogLevel to use.
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param error             the Error to include in the log entry for fatal and error logs.
     * @param message           the message to log or the format string to use for formatting.
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     * 
     * @see [[formatAndWrite]]
     */
    public log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void {
        this.formatAndWrite(level, correlationId, error, message, ...args);
    }

    /**
     * Logs a message using the [[LogLevel.Fatal fatal]] log level. Calls this class's [[formatAndWrite]]
     * method with level set to [[LogLevel.Fatal]].
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param error             the Error to include in the log entry.
     * @param message           the message to log as fatal or the format string to use for formatting. 
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     * 
     * @see [[formatAndWrite]]
     * @see [[LogLevel]]
     */
    public fatal(correlationId: string, error: Error, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Fatal, correlationId, error, message, ...args);
    }

    /**
     * Logs a message using the [[LogLevel.Error error]] log level. Calls this class's [[formatAndWrite]]
     * method with level set to [[LogLevel.Error]].
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param error             the Error to include in the log entry.
     * @param message           the message to log as error or the format string to use for formatting. 
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     * 
     * @see [[formatAndWrite]]
     * @see [[LogLevel]]
     */
    public error(correlationId: string, error: Error, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Error, correlationId, error, message, ...args);
    }

    /**
     * Logs a message using the [[LogLevel.Warn warn]] log level. Calls this class's [[formatAndWrite]]
     * method with level set to [[LogLevel.Warn]].
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param message           the message to log as warn or the format string to use for formatting. 
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     * 
     * @see [[formatAndWrite]]
     * @see [[LogLevel]]
     */
    public warn(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Warn, correlationId, null, message, ...args);
    }

    /**
     * Logs a message using the [[LogLevel.Info info]] log level. Calls this class's [[formatAndWrite]]
     * method with level set to [[LogLevel.Info]].
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param message           the message to log as info or the format string to use for formatting. 
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     * 
     * @see [[formatAndWrite]]
     * @see [[LogLevel]]
     */
    public info(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Info, correlationId, null, message, ...args);
    }

    /**
     * Logs a message using the [[LogLevel.Debug debug]] log level. Calls this class's [[formatAndWrite]]
     * method with level set to [[LogLevel.Debug]].
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param message           the message to log as debug or the format string to use for formatting. 
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     * 
     * @see [[formatAndWrite]]
     * @see [[LogLevel]]
     */
    public debug(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Debug, correlationId, null, message, ...args);
    }

    /**
     * Logs a message using the [[LogLevel.Trace trace]] log level. Calls this class's [[formatAndWrite]]
     * method with level set to [[LogLevel.Trace]].
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param message           the message to log as trace or the format string to use for formatting. 
     * @param args              the arguments to format <code>message</code> with if it is a format string.
     * 
     * @see [[formatAndWrite]]
     * @see [[LogLevel]]
     */
    public trace(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Trace, correlationId, null, message, ...args);
    }

    /**
     * Composes an Error string, which can be used in a log entry.
     * 
     * @param error     the Error to compose a string with.
     * @returns the string created using the information from the Error. Example error string: 
     *          "<error's message> StackTrace: <error's stack>"
     */
    protected composeError(error: Error): string {
        let builder: string = "";

        builder += error.message;

        let appError: any = error;
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