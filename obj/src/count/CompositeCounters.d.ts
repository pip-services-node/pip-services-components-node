import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { ICounters } from './ICounters';
import { Timing } from './Timing';
import { ITimingCallback } from './ITimingCallback';
export declare class CompositeCounters implements ICounters, ITimingCallback, IReferenceable {
    protected readonly _counters: ICounters[];
    CompositeCounters(references?: IReferences): void;
    setReferences(references: IReferences): void;
    beginTiming(name: string): Timing;
    endTiming(name: string, elapsed: number): void;
    stats(name: string, value: number): void;
    last(name: string, value: number): void;
    timestampNow(name: string): void;
    timestamp(name: string, value: Date): void;
    incrementOne(name: string): void;
    increment(name: string, value: number): void;
}
