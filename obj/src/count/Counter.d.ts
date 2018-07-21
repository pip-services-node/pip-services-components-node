import { CounterType } from './CounterType';
export declare class Counter {
    constructor(name: string, type: CounterType);
    name: string;
    type: CounterType;
    last: number;
    count: number;
    min: number;
    max: number;
    average: number;
    time: Date;
}
