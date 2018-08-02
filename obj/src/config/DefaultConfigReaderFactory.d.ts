/** @module config */
import { Descriptor } from 'pip-services-commons-node';
import { Factory } from '../build/Factory';
/**
 * Contains static read-only descriptors for the Memory, JSON, and YAML ConfigReaders (as well as a default config-reader descriptor).
 *
 * @see [[Factory]]
 */
export declare class DefaultConfigReaderFactory extends Factory {
    static readonly Descriptor: Descriptor;
    static readonly MemoryConfigReaderDescriptor: Descriptor;
    static readonly JsonConfigReaderDescriptor: Descriptor;
    static readonly YamlConfigReaderDescriptor: Descriptor;
    /**
     * Adds object factories for MemoryConfigReader, JsonConfigReader, and YamlConfigReader to this Factory.
     */
    constructor();
}
