/** @module info */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for ContextInfo and ContainerInfo (as well as a default "info" descriptor).
 *
 * @see [[Factory]]
 */
export declare class DefaultInfoFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly ContextInfoDescriptor: Descriptor;
    static readonly ContainerInfoDescriptor: Descriptor;
    /**
     * Create a new DefaultInfoFactory object, containing two [[ContextInfo]] object factories - one for ContextInfo and one
     * for ContainerInfo.
     *
     * @see [[ContextInfo]]
     */
    constructor();
}
