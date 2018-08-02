/** @module log */
import { ConfigParams } from 'pip-services-commons-node';
import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { LogMessage } from './LogMessage';
export declare abstract class CachedLogger extends Logger {
    protected _cache: LogMessage[];
    protected _updated: boolean;
    protected _lastDumpTime: number;
    protected _maxCacheSize: number;
    protected _interval: number;
    constructor();
    protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void;
    protected abstract save(messages: LogMessage[], callback: (err: any) => void): void;
    configure(config: ConfigParams): void;
    clear(): void;
    dump(): void;
    protected update(): void;
}
