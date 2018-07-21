import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
export declare class DefaultTestFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly ShutdownDescriptor: Descriptor;
    constructor();
}
