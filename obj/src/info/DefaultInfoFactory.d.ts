import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for ContextInfo and ContainerInfo (as well as a default info descriptor).
 *
 * @see Factory
 */
export declare class DefaultInfoFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly ContextInfoDescriptor: Descriptor;
    static readonly ContainerInfoDescriptor: Descriptor;
    /**
     * Adds object factories for ContextInfo and ContainerInfo to this Factory.
     *
     * @see Factory#Factory
     */
    constructor();
}
