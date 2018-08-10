/** @module log */
import { ConfigParams } from 'pip-services-commons-node';
import { ErrorDescription } from 'pip-services-commons-node';
import { ErrorDescriptionFactory } from 'pip-services-commons-node';

import { LogLevel } from './LogLevel';
import { Logger } from './Logger';
import { LogMessage } from './LogMessage';
import { LogLevelConverter } from './LogLevelConverter';

/**
 * Abstract class that can be used to create loggers that 
 * write [[LogMessage log messages]] to the cache.
 * 
 * @see [[Logger]]
 * @see [[LogMessage]]
 */
export abstract class CachedLogger extends Logger {
    protected _cache: LogMessage[] = [];
    protected _updated: boolean = false;
    protected _lastDumpTime: number = new Date().getTime();
    protected _maxCacheSize: number = 100;
    protected _interval: number = 10000;
    
    /**
     * Creates a new CachedLogger object.
     */
    public constructor() {
        super();
    }

    /**
     * Writes a [[LogMessage]] to the cache using the provided level, correlation id, error, and message. 
     * The [[LogMessage LogMessage's]] time and source will be set to the current time and this logger's 
     * source, respectively.
     * 
     * @param level             the [[LogLevel]] of the log entry.
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param ex                the Exception (Error) to include in the log entry.
     * @param message           the message to log.
     * 
     * @see [[LogMessage]]
     * @see [[LogLevel]]
     */
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

    /**
     * Abstract method that will contain the logic for saving an array of [[LogMessage LogMessages]] 
     * to memory.
     * 
     * @param messages  the array of [[LogMessage LogMessages]] to save.
     * @param callback  the function to call once the saving process is complete. Will be called 
     *                  with an error if one is raised.
     */
    protected abstract save(messages: LogMessage[], callback: (err: any) => void): void;

    /**
     * Configures this object using the parameters provided. Calls Logger's [[Logger.configure configure]] 
     * and additionally looks for parameters with the keys "options.interval" and "options.max_cache_size". 
     * If they are found, then they will be set for this object. Otherwise, the corresponding values will 
     * default to the values that were previously set for this object.
     * 
     * @param config    ConfigParams, containing "options.interval" and/or 
     *                  "options.max_cache_size" items.
     * 
     * @see [[Logger.configure]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public configure(config: ConfigParams): void {
        super.configure(config);
        
        this._interval = config.getAsLongWithDefault("options.interval", this._interval);
        this._maxCacheSize = config.getAsIntegerWithDefault("options.max_cache_size", this._maxCacheSize);
    }
    
    /**
     * Removes all [[LogMessage LogMessages]] from this object's cache.
     */
    public clear(): void {
        this._cache = [];
	    this._updated = false;
    }

    /**
     * Dumps the [[LogMessage LogMessages]] that are stored in this object's 
     * cache to memory.
     * 
     * @see [[save]]
     */
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

    /**
     * Checks whether or not the update interval has passed (since the last 
     * [[dump]] was performed) and, if it has, performs a [[dump]].
     * 
     * @see [[dump]]
     */
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
