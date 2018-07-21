import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { ConflictException } from 'pip-services-commons-node';

import { ILock } from './ILock';

export abstract class Lock implements ILock, IReconfigurable {
    private _retryTimeout: number = 100;

    public configure(config: ConfigParams): void {
        this._retryTimeout = config.getAsIntegerWithDefault("options.retry_timeout", this._retryTimeout);
    }

    public abstract tryAcquireLock(correlationId: string, key: string, ttl: number,
        callback: (err: any, result: boolean) => void): void;

    public abstract releaseLock(correlationId: string, key: string,
        callback?: (err: any) => void): void;
            
    public acquireLock(correlationId: string, key: string, ttl: number, timeout: number,
        callback: (err: any) => void): void {
        let retryTime = new Date().getTime() + timeout;

        // Try to get lock first
        this.tryAcquireLock(correlationId, key, ttl, (err, result) => {
            if (err || result) {
                callback(err);
                return;
            }

            // Start retrying
            let interval = setInterval(() => {
                // When timeout expires return false
                let now = new Date().getTime();
                if (now > retryTime) {
                    clearInterval(interval);
                    let err = new ConflictException(
                        correlationId,
                        "LOCK_TIMEOUT",
                        "Acquiring lock " + key + " failed on timeout"
                    ).withDetails("key", key);
                    callback(err);
                    return;
                }

                this.tryAcquireLock(correlationId, key, ttl, (err, result) => {
                    if (err || result) {
                        clearInterval(interval);
                        callback(err);
                    }
                });
            }, this._retryTimeout);
        });
    }
}