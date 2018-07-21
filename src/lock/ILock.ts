export interface ILock {
    tryAcquireLock(correlationId: string, key: string, ttl: number,
        callback: (err: any, result: boolean) => void): void;
    
    acquireLock(correlationId: string, key: string, ttl: number, timeout: number,
        callback: (err: any) => void): void;

    releaseLock(correlationId: string, key: string,
        callback?: (err: any) => void): void;
}