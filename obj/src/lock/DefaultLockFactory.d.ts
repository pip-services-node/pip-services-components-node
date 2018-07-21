import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
export declare class DefaultLockFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly NullLockDescriptor: Descriptor;
    static readonly MemoryLockDescriptor: Descriptor;
    constructor();
}
