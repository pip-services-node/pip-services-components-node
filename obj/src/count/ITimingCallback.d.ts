export interface ITimingCallback {
    endTiming(name: string, elapsed: number): void;
}
