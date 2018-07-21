import { LogLevel } from './LogLevel';

// Todo: solve issue with overloaded methods. Look at Python implementation
export interface ILogger {
	getLevel(): LogLevel;
    setLevel(value: LogLevel): void;
    
    log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]) : void;

    fatal(correlationId: string, error: Error, message: string, ...args: any[]) : void;
    // these overloads are not supported in TS
    //fatal(correlationId: string, error: Error) : void;
    //fatal(correlationId: string, message: string, ...args: any[]) : void;

    error(correlationId: string, error: Error, message: string, ...args: any[]) : void;
    // these overloads are not supported in TS
    //error(correlationId: string, error: Error) : void;
    //error(correlationId: string, message: string, ...args: any[]) : void;    

    warn(correlationId: string, message: string, ...args: any[]) : void;
    info(correlationId: string, message: string, ...args: any[]) : void;
    debug(correlationId: string, message: string, ...args: any[]) : void;
    trace(correlationId: string, message: string, ...args: any[]) : void;
}