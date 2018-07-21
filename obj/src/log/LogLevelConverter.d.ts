import { LogLevel } from './LogLevel';
export declare class LogLevelConverter {
    static toLogLevel(value: any, defaultValue?: LogLevel): LogLevel;
    static toString(level: LogLevel): string;
    static toInteger(level: LogLevel): number;
}
