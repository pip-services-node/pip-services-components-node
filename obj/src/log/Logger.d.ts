import { ConfigParams } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
export declare abstract class Logger implements ILogger, IReconfigurable, IReferenceable {
    protected _level: LogLevel;
    protected _source: string;
    protected constructor();
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getLevel(): LogLevel;
    setLevel(value: LogLevel): void;
    getSource(): string;
    setSource(value: string): void;
    protected abstract write(level: LogLevel, correlationId: string, error: Error, message: string): void;
    protected formatAndWrite(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void;
    log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void;
    fatal(correlationId: string, error: Error, message: string, ...args: any[]): void;
    error(correlationId: string, error: Error, message: string, ...args: any[]): void;
    warn(correlationId: string, message: string, ...args: any[]): void;
    info(correlationId: string, message: string, ...args: any[]): void;
    debug(correlationId: string, message: string, ...args: any[]): void;
    trace(correlationId: string, message: string, ...args: any[]): void;
    protected composeError(error: Error): string;
}
