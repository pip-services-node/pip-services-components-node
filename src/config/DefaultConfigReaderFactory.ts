/** @module config */
import { Descriptor } from 'pip-services-commons-node';

import { Factory } from '../build/Factory';
import { MemoryConfigReader } from './MemoryConfigReader';
import { JsonConfigReader } from './JsonConfigReader';
import { YamlConfigReader } from './YamlConfigReader';

/**
 * Contains static read-only descriptors for the [[MemoryConfigReader Memory]], [[JsonConfigReader JSON]], 
 * and [[YamlConfigReader YAML]] ConfigReaders (as well as a default "config-reader" descriptor).
 * 
 * @see [[Factory]]
 */
export class DefaultConfigReaderFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "config-reader", "default", "1.0");
	public static readonly MemoryConfigReaderDescriptor = new Descriptor("pip-services", "config-reader", "memory", "*", "1.0");
	public static readonly JsonConfigReaderDescriptor = new Descriptor("pip-services", "config-reader", "json", "*", "1.0");
	public static readonly YamlConfigReaderDescriptor = new Descriptor("pip-services", "config-reader", "yaml", "*", "1.0");
	
	/**
	 * Create a new DefaultConfigReaderFactory object, containing [[MemoryConfigReader]], [[JsonConfigReader]], 
	 * and [[YamlConfigReader]] object factories.
	 * 
	 * @see [[MemoryConfigReader]]
	 * @see [[JsonConfigReader]]
	 * @see [[YamlConfigReader]]
	 */
	public constructor() {
        super();
		this.registerAsType(DefaultConfigReaderFactory.MemoryConfigReaderDescriptor, MemoryConfigReader);
		this.registerAsType(DefaultConfigReaderFactory.JsonConfigReaderDescriptor, JsonConfigReader);
		this.registerAsType(DefaultConfigReaderFactory.YamlConfigReaderDescriptor, YamlConfigReader);
	}
}
