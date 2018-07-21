import { Timing } from './Timing';

export interface ICounters {
    beginTiming(name: string) : Timing;
	stats(name: string, value: number) : void;
	last(name: string, value: number) : void;
	timestampNow(name: string) : void;
	timestamp(name: string, value: Date) : void;
	incrementOne(name: string) : void;
	increment(name: string, value: number) : void;
}