/** @module log */
import { StringConverter } from 'pip-services-commons-node';

import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { LogLevelConverter } from './LogLevelConverter';

/**
 * Used to write log entries to the console.
 * 
 * @see [[Logger]]
 */
export class ConsoleLogger extends Logger {
    
    /**
     * Creates a new ConsoleLogger object.
     */
    public constructor() {
        super();
    }

    /**
     * Writes a log entry to the console using the provided level, correlation id, error, and message.
     * 
     * @param level             the LogLevel of the log entry. If it is less than the level set 
     *                          in this logger, then the message will not be logged.
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param ex                the Exception (Error) to include in the log entry.
     * @param message           the message to log.
     */
	protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void {
        if (this.getLevel() < level) return;

        let result: string = '[';
        result += correlationId != null ? correlationId : "---";
        result += ':';
        result += LogLevelConverter.toString(level);
        result += ':';
        result += StringConverter.toString(new Date());
        result += "] ";

        result += message;

        if (ex != null) {
            if (message.length == 0)
                result += "Error: ";
            else
                result += ": ";

            result += this.composeError(ex);
        }

        if (level == LogLevel.Fatal || level == LogLevel.Error || level == LogLevel.Warn)
            console.error(result);
        else
            console.log(result);
	}

}
