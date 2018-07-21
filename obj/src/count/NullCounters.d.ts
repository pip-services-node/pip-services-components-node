import { Timing } from './Timing';
import { ICounters } from './ICounters';
export declare class NullCounters implements ICounters {
    NullCounters(): void;
    beginTiming(name: string): Timing;
    stats(name: string, value: number): void;
    last(name: string, value: number): void;
    timestampNow(name: string): void;
    timestamp(name: string, value: Date): void;
    incrementOne(name: string): void;
    increment(name: string, value: number): void;
}
