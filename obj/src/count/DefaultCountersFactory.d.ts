/** @module count */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
export declare class DefaultCountersFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullCountersDescriptor: Descriptor;
    static readonly LogCountersDescriptor: Descriptor;
    static readonly CompositeCountersDescriptor: Descriptor;
    constructor();
}
