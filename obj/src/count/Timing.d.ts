import { ITimingCallback } from './ITimingCallback';
export declare class Timing {
    private _start;
    private _callback;
    private _counter;
    constructor(counter?: string, callback?: ITimingCallback);
    endTiming(): void;
}
