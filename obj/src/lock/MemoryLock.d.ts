import { Lock } from './Lock';
export declare class MemoryLock extends Lock {
    private _locks;
    tryAcquireLock(correlationId: string, key: string, ttl: number, callback: (err: any, result: boolean) => void): void;
    releaseLock(correlationId: string, key: string, callback?: (err: any) => void): void;
}
