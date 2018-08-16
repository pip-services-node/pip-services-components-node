import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
/**
 * Used to write log entries to the console.
 *
 * @see [[Logger]]
 */
export declare class ConsoleLogger extends Logger {
    /**
     * Creates a new ConsoleLogger object.
     */
    constructor();
    /**
     * Writes a log entry to the console using the provided level, correlation id, error, and message.
     *
     * @param level             the LogLevel of the log entry. If it is less than the level set
     *                          in this logger, then the message will not be logged.
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param ex                the Exception (Error) to include in the log entry.
     * @param message           the message to log.
     */
    protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void;
}
