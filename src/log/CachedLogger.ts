import { ConfigParams } from 'pip-services-commons-node';
import { ErrorDescription } from 'pip-services-commons-node';
import { ErrorDescriptionFactory } from 'pip-services-commons-node';

import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { LogMessage } from './LogMessage';
import { LogLevelConverter } from './LogLevelConverter';

export abstract class CachedLogger extends Logger {
    protected _cache: LogMessage[] = [];
    protected _updated: boolean = false;
    protected _lastDumpTime: number = new Date().getTime();
    protected _maxCacheSize: number = 100;
    protected _interval: number = 10000;
    
    public constructor() {
        super();
    }

	protected write(level: LogLevel, correlationId: string, ex: Error, message: string): void {
		let error: ErrorDescription = ex != null ? ErrorDescriptionFactory.create(ex) : null;
		let logMessage: LogMessage = <LogMessage>{
            time: new Date(),
            level: LogLevelConverter.toString(level),
            source: this._source,
            correlation_id: correlationId,
            error: error,
            message: message
        };
		
        this._cache.push(logMessage);
		
		this.update();
	}

    protected abstract save(messages: LogMessage[], callback: (err: any) => void): void;

    public configure(config: ConfigParams): void {
        super.configure(config);
        
        this._interval = config.getAsLongWithDefault("options.interval", this._interval);
        this._maxCacheSize = config.getAsIntegerWithDefault("options.max_cache_size", this._maxCacheSize);
    }
    
    public clear(): void {
        this._cache = [];
	    this._updated = false;
    }

    public dump(): void {
        if (this._updated) {
            if (!this._updated) return;
            
            let messages = this._cache;
            this._cache = [];
            
            this.save(messages, (err) => {
                if (err) {
                    // Adds messages back to the cache
                    messages.push(...this._cache);
                    this._cache = messages;

                    // Truncate cache
                    let deleteCount = this._cache.length - this._maxCacheSize;
                    if (deleteCount > 0)
                        this._cache.splice(0, deleteCount);
                }
            });

            this._updated = false;
            this._lastDumpTime = new Date().getTime();
        }
    }

    protected update(): void {
    	this._updated = true;
    	let now = new Date().getTime();

    	if (now > this._lastDumpTime + this._interval) {
    		try {
    			this.dump();
    		} catch (ex) {
    			// Todo: decide what to do
    		}
    	}
    }
}
