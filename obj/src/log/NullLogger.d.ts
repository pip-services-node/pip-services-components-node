/** @module log */
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
/**
 * Null implementation of the [[ILogger]] interface. Methods do not contain any logic and
 * simply accept the parameters passed to them. Can be used to cut dependecies while testing.
 *
 * @see [[ILogger]]
 */
export declare class NullLogger implements ILogger {
    /**
     * Creates a new NullLogger object.
     */
    constructor();
    /**
     * Null call to the [[ILogger.getLevel getLevel]] method.
     *
     * @returns the None LogLevel
     *
     * @see [[LogLevel.None]]
     */
    getLevel(): LogLevel;
    /**
     * Null call to the [[ILogger.setLevel setLevel]] method.
     *
     * @param value		not used.
     */
    setLevel(value: LogLevel): void;
    /**
     * Null call to the [[ILogger.log log]] method.
     *
     * @param level				not used.
     * @param correlationId 	not used.
     * @param error				not used.
     * @param message 			not used.
     * @param args				not used.
     */
    log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void;
    /**
     * Null call to the [[ILogger.fatal fatal]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    fatal(correlationId: string, error: Error, message: string, ...args: any[]): void;
    /**
     * Null call to the [[ILogger.error error]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    error(correlationId: string, error: Error, message: string, ...args: any[]): void;
    /**
     * Null call to the [[ILogger.warn warn]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    warn(correlationId: string, message: string, ...args: any[]): void;
    /**
     * Null call to the [[ILogger.info info]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    info(correlationId: string, message: string, ...args: any[]): void;
    /**
     * Null call to the [[ILogger.debug debug]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    debug(correlationId: string, message: string, ...args: any[]): void;
    /**
     * Null call to the [[ILogger.trace trace]] method.
     *
     * @param correlationId 	not used.
     * @param message 			not used.
     * @param args				not used.
     */
    trace(correlationId: string, message: string, ...args: any[]): void;
}
