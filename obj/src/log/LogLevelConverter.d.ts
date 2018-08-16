import { LogLevel } from './LogLevel';
/**
 * Helper class that contains static methods for converting [[LogLevel LogLevels]]
 * to and from string values.
 *
 * @see [[LogLevel]]
 */
export declare class LogLevelConverter {
    /**
     * Static method that converts integers and strings to their corresponding [[LogLevel LogLevels]].
     *
     * @param value         the integer or string value to convert.
     *                      Example values: 0/"NOTHING"/"NONE"; 1/"FATAL"; 6/"TRACE".
     * @param defaultValue  the default LogLevel to use if conversion is not possible.
     *                      Defaults to LogLevel.Info if omitted.
     *
     * @returns the LogLevel that corresponds to the given value.
     *
     * @see [[LogLevel]]
     */
    static toLogLevel(value: any, defaultValue?: LogLevel): LogLevel;
    /**
     * Static method that converts a [[LogLevel]] to its string
     * equivalent (its name in CAPS).
     *
     * @param level     the LogLevel to convert.
     * @returns the LogLevel's name or "UNDEF" (if the level is undefined).
     *
     * @see [[LogLevel]]
     */
    static toString(level: LogLevel): string;
    /**
     * Static method that converts a [[LogLevel]] to its numeric
     * equivalent. Fatal is 1 and Trace is 6.
     *
     * @param level     the LogLevel to convert.
     * @returns the LogLevel as an integer.
     *
     * @see [[LogLevel]]
     */
    static toInteger(level: LogLevel): number;
}
