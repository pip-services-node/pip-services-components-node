/** @module log */
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
/**
 * Null implementation of the [[ILogger]] interface. Methods do not contain any logic and  
 * simply accept the parameters passed to them. Can be used to cut dependecies while testing.
 * 
 * @see [[ILogger]]
 */
export class NullLogger implements ILogger {

	/**
	 * Creates a new NullLogger object.
	 */
	public constructor() { }

	/**
	 * Null call to the [[ILogger.getLevel getLevel]] method.
	 * 
	 * @returns the None LogLevel
	 * 
	 * @see [[LogLevel.None]]
	 */
	public getLevel(): LogLevel { return LogLevel.None; }

	/**
	 * Null call to the [[ILogger.setLevel setLevel]] method.
	 * 
	 * @param value		not used.
	 */
	public setLevel(value: LogLevel): void { }

	/**
	 * Null call to the [[ILogger.log log]] method.
	 * 
	 * @param level				not used.
	 * @param correlationId 	not used.
	 * @param error				not used.
	 * @param message 			not used.
	 * @param args				not used.
	 */
	public log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void { }

	/**
	 * Null call to the [[ILogger.fatal fatal]] method.
	 * 
	 * @param correlationId 	not used.
	 * @param message 			not used.
	 * @param args				not used.
	 */
	public fatal(correlationId: string, error: Error, message: string, ...args: any[]): void { }

	/**
	 * Null call to the [[ILogger.error error]] method.
	 * 
	 * @param correlationId 	not used.
	 * @param message 			not used.
	 * @param args				not used.
	 */
	public error(correlationId: string, error: Error, message: string, ...args: any[]): void { }

	/**
	 * Null call to the [[ILogger.warn warn]] method.
	 * 
	 * @param correlationId 	not used.
	 * @param message 			not used.
	 * @param args				not used.
	 */
	public warn(correlationId: string, message: string, ...args: any[]): void { }

	/**
	 * Null call to the [[ILogger.info info]] method.
	 * 
	 * @param correlationId 	not used.
	 * @param message 			not used.
	 * @param args				not used.
	 */
	public info(correlationId: string, message: string, ...args: any[]): void { }

	/**
	 * Null call to the [[ILogger.debug debug]] method.
	 * 
	 * @param correlationId 	not used.
	 * @param message 			not used.
	 * @param args				not used.
	 */
	public debug(correlationId: string, message: string, ...args: any[]): void { }
	
	/**
	 * Null call to the [[ILogger.trace trace]] method.
	 * 
	 * @param correlationId 	not used.
	 * @param message 			not used.
	 * @param args				not used.
	 */
	public trace(correlationId: string, message: string, ...args: any[]): void { }
}