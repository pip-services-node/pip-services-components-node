import { CounterType } from './CounterType';

export class Counter {
    public constructor(name: string, type: CounterType) {
        this.name = name;
        this.type = type;
    }

    public name: string;
    public type: CounterType;
    public last: number;
    public count: number;
    public min: number;
    public max: number;
    public average: number;
    public time: Date;
}