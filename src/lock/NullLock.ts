import { ILock } from './ILock';

export class NullLock implements ILock {
    public tryAcquireLock(correlationId: string, key: string, ttl: number,
        callback: (err: any, result: boolean) => void): void {
        callback(null, true);
    }

    public acquireLock(correlationId: string, key: string, ttl: number, timeout: number,
        callback: (err: any) => void): void {
        callback(null);
    }

    public releaseLock(correlationId: string, key: string,
        callback?: (err: any) => void): void {
        if (callback) callback(null);
    }
}