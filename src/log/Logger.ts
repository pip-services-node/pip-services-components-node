/** @module log */
/** @hidden */ 
let util = require('util');

import { ConfigParams } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { IReconfigurable } from 'pip-services-commons-node';
import { ILogger } from './ILogger';
import { LogLevel } from './LogLevel';
import { LogLevelConverter } from './LogLevelConverter';
import { ContextInfo } from '../info/ContextInfo';

export abstract class Logger implements ILogger, IReconfigurable, IReferenceable {
    protected _level: LogLevel = LogLevel.Info;
    protected _source: string = null;

    protected constructor() { }

    public configure(config: ConfigParams): void {
        this._level = LogLevelConverter.toLogLevel(
            config.getAsObject("level"),
            this._level
        );
        this._source = config.getAsStringWithDefault("source", this._source);
    }

    public setReferences(references: IReferences) {
        let contextInfo = references.getOneOptional<ContextInfo>(
            new Descriptor("pip-services", "context-info", "*", "*", "1.0"));
        if (contextInfo != null && this._source == null) {
            this._source = contextInfo.name;
        }
    }

    public getLevel(): LogLevel {
        return this._level;
    }

    public setLevel(value: LogLevel): void {
        this._level = value;
    }

    public getSource(): string {
        return this._source;
    }

    public setSource(value: string): void {
        this._source = value;
    }
    
    protected abstract write(level: LogLevel, correlationId: string, error: Error, message: string): void;

    protected formatAndWrite(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void {
        message = message != null ? message : "";
        if (args != null && args.length > 0) {
            // message = message.replace(/{(\d+)}/g, function (match, number) {
            //     return typeof args[number] != 'undefined' ? args[number] : match;
            // });
            message = util.format(message, ...args);
        }

        this.write(level, correlationId, error, message);
    }

    public log(level: LogLevel, correlationId: string, error: Error, message: string, ...args: any[]): void {
        this.formatAndWrite(level, correlationId, error, message, ...args);
    }

    public fatal(correlationId: string, error: Error, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Fatal, correlationId, error, message, ...args);
    }

    public error(correlationId: string, error: Error, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Error, correlationId, error, message, ...args);
    }

    public warn(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Warn, correlationId, null, message, ...args);
    }

    public info(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Info, correlationId, null, message, ...args);
    }

    public debug(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Debug, correlationId, null, message, ...args);
    }

    public trace(correlationId: string, message: string, ...args: any[]): void {
        this.formatAndWrite(LogLevel.Trace, correlationId, null, message, ...args);
    }

    protected composeError(error: Error): string {
        let builder: string = "";

        builder += error.message;

        let appError: any = error;
        if (appError.cause) {
            builder += " Caused by: ";
            builder += appError.cause;
        }

        if (error.stack) {
            builder += " Stack trace: ";
            builder += error.stack;
        }

        return builder;
    }
}