import { Descriptor } from 'pip-services-commons-node';

import { Factory } from '../build/Factory';
import { Shutdown } from './Shutdown';

export class DefaultTestFactory extends Factory {
	public static readonly Descriptor = new Descriptor("pip-services", "factory", "test", "default", "1.0");
	public static readonly ShutdownDescriptor = new Descriptor("pip-services", "shutdown", "*", "*", "1.0");

	public constructor() {
        super();
		this.registerAsType(DefaultTestFactory.ShutdownDescriptor, Shutdown);
	}
}