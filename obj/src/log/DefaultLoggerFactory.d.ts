import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
export declare class DefaultLoggerFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullLoggerDescriptor: Descriptor;
    static readonly ConsoleLoggerDescriptor: Descriptor;
    static readonly CompositeLoggerDescriptor: Descriptor;
    constructor();
}
