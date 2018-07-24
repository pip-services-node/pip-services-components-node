/** @module log */
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';

export class NullLogger implements ILogger {

	public constructor() { }

	public getLevel(): LogLevel { return LogLevel.None; }
	public setLevel(value: LogLevel): void { }

	public log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void { }
	public fatal(correlationId: string, error: Error, message: string, ...args: any[]): void { }
	public error(correlationId: string, error: Error, message: string, ...args: any[]): void { }
	public warn(correlationId: string, message: string, ...args: any[]): void { }
	public info(correlationId: string, message: string, ...args: any[]): void { }
	public debug(correlationId: string, message: string, ...args: any[]): void { }
	public trace(correlationId: string, message: string, ...args: any[]): void { }
}