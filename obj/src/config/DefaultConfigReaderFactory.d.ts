/** @module config */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for the [[MemoryConfigReader Memory]], [[JsonConfigReader JSON]],
 * and [[YamlConfigReader YAML]] ConfigReaders (as well as a default "config-reader" descriptor).
 *
 * @see [[Factory]]
 */
export declare class DefaultConfigReaderFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryConfigReaderDescriptor: Descriptor;
    static readonly JsonConfigReaderDescriptor: Descriptor;
    static readonly YamlConfigReaderDescriptor: Descriptor;
    /**
     * Create a new DefaultConfigReaderFactory object, containing [[MemoryConfigReader]], [[JsonConfigReader]],
     * and [[YamlConfigReader]] object factories.
     *
     * @see [[MemoryConfigReader]]
     * @see [[JsonConfigReader]]
     * @see [[YamlConfigReader]]
     */
    constructor();
}
