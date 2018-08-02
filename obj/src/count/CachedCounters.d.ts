/** @module count */
import { IReconfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';
import { CounterType } from './CounterType';
import { Counter } from './Counter';
export declare abstract class CachedCounters implements ICounters, IReconfigurable, ITimingCallback {
    protected _interval: number;
    protected _resetTimeout: number;
    protected _cache: {
        [id: string]: Counter;
    };
    protected _updated: boolean;
    protected _lastDumpTime: number;
    protected _lastResetTime: number;
    CachedCounters(): void;
    getInterval(): number;
    setInterval(value: number): void;
    protected abstract save(counters: Counter[]): void;
    configure(config: ConfigParams): void;
    clear(name: string): void;
    clearAll(): void;
    beginTiming(name: string): Timing;
    dump(): void;
    protected update(): void;
    private resetIfNeeded;
    getAll(): Counter[];
    get(name: string, type: CounterType): Counter;
    private calculateStats;
    endTiming(name: string, elapsed: number): void;
    stats(name: string, value: number): void;
    last(name: string, value: number): void;
    timestampNow(name: string): void;
    timestamp(name: string, value: Date): void;
    incrementOne(name: string): void;
    increment(name: string, value: number): void;
}
