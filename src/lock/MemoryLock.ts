import { Lock } from './Lock';

export class MemoryLock extends Lock {
    private _locks: { [key: string]: number } = {};

    public tryAcquireLock(correlationId: string, key: string, ttl: number,
        callback: (err: any, result: boolean) => void): void {
        let expireTime = this._locks[key];
        let now = new Date().getTime();

        if (expireTime == null || expireTime < now) {
            this._locks[key] = now + ttl;
            callback(null, true);
        } else {
            callback(null, false);
        }
    }

    public releaseLock(correlationId: string, key: string,
        callback?: (err: any) => void): void {
        delete this._locks[key];
        if (callback) callback(null);
    }
}