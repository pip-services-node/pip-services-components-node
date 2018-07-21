import { Timing } from './Timing';
import { ICounters } from './ICounters';

export class NullCounters implements ICounters {

	public NullCounters() { }

	public beginTiming(name: string): Timing {
		return new Timing();
	}

	public stats(name: string, value: number): void { }
	public last(name: string, value: number): void { }
	public timestampNow(name: string): void { }
	public timestamp(name: string, value: Date): void { }
	public incrementOne(name: string): void { }
	public increment(name: string, value: number): void { }
}