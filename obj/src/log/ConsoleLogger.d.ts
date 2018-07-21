import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
export declare class ConsoleLogger extends Logger {
    constructor();
    protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void;
}
