/** @module log */
import { LogLevel } from './LogLevel';

// Todo: solve issue with overloaded methods. Look at Python implementation
/**
 * Interface for creating classes that can log messages of various log levels.
 */
export interface ILogger {
    /**
     * Abstract method that will contain the logic for retrieving the current 
     * logger's [[LogLevel]].
     * 
     * @returns this logger's LogLevel.
     * 
     * @see [[LogLevel]]
     */
    getLevel(): LogLevel;
    
    /**
     * Abstract method that will contain the logic for setting the current 
     * logger's [[LogLevel]].
     * 
     * @param value     the LogLevel to set this logger to.
     * 
     * @see [[LogLevel]]
     */
    setLevel(value: LogLevel): void;
    
    /**
     * Abstract method that will contain the logic for logging a message using the 
     * given [[LogLevel]] and parameters. 
     * 
     * @param level             the LogLevel to use.
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param error             the Error to include in the log entry. 
     * @param message           the message to log.
     * @param args              the arguments to add to the log entry. 
     * 
     * @see [[LogLevel]]
     */
    log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]) : void;

    /**
     * Abstract method that will contain the logic for logging a message using the 
     * [[LogLevel.Fatal fatal log level]]. 
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param error             the Error to include in the log entry.
     * @param message           the message to log as a fatal message.
     * @param args              the arguments to add to the log entry. 
     * 
     * @see [[LogLevel]]
     */
    fatal(correlationId: string, error: Error, message: string, ...args: any[]) : void;
    // Todo: these overloads are not supported in TS
    //fatal(correlationId: string, error: Error) : void;
    //fatal(correlationId: string, message: string, ...args: any[]) : void;

    /**
     * Abstract method that will contain the logic for logging a message using the 
     * [[LogLevel.Error error log level]]. 
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param error             the Error to include in the log entry.
     * @param message           the message to log as an error.
     * @param args              the arguments to add to the log entry. 
     * 
     * @see [[LogLevel]]
     */
    error(correlationId: string, error: Error, message: string, ...args: any[]) : void;
    // Todo: these overloads are not supported in TS
    //error(correlationId: string, error: Error) : void;
    //error(correlationId: string, message: string, ...args: any[]) : void;    

    /**
     * Abstract method that will contain the logic for logging a message using the 
     * [[LogLevel.Warn warn log level]]. 
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param message           the message to log as a warning.
     * @param args              the arguments to add to the log entry. 
     * 
     * @see [[LogLevel]]
     */
    warn(correlationId: string, message: string, ...args: any[]) : void;

    /**
     * Abstract method that will contain the logic for logging a message using the 
     * [[LogLevel.Info info log level]]. 
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param message           the message to log as an informational message.
     * @param args              the arguments to add to the log entry. 
     * 
     * @see [[LogLevel]]
     */
    info(correlationId: string, message: string, ...args: any[]) : void;

    /**
     * Abstract method that will contain the logic for logging a message using the 
     * [[LogLevel.Debug debug log level]]. 
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param message           the message to log as a debug message.
     * @param args              the arguments to add to the log entry. 
     * 
     * @see [[LogLevel]]
     */
    debug(correlationId: string, message: string, ...args: any[]) : void;

    /**
     * Abstract method that will contain the logic for logging a message using the 
     * [[LogLevel.Trace trace log level]]. 
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param message           the message to log as a trace message.
     * @param args              the arguments to add to the log entry. 
     * 
     * @see [[LogLevel]]
     */
    trace(correlationId: string, message: string, ...args: any[]) : void;
}