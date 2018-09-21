/** 
 * @module component 
 * @preferred
 * The root package of pip-services-components.
 */
import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { CompositeLogger } from './log/CompositeLogger';
import { CompositeCounters } from './count/CompositeCounters';

/**
 * Abstract component that supportes configurable dependencies, logging
 * and performance counters.
 * 
 * ### Configuration parameters ###
 * 
 * dependencies:
 *   [dependency name 1]: Dependency 1 locator (descriptor)
 *   ...
 *   [dependency name N]: Dependency N locator (descriptor)
 * 
 * ### References ###
 * 
 * - *:counters:*:*:1.0       (optional) [[ICounters]] components to pass collected measurements
 * - *:logger:*:*:1.0         (optional) [[ILogger]] components to pass log messages
 * - ...                      References must match configured dependencies.
 */
export class Component implements IConfigurable, IReferenceable {
    protected _dependencyResolver: DependencyResolver = new DependencyResolver();
    protected _logger: CompositeLogger = new CompositeLogger();
    protected _counters: CompositeCounters = new CompositeCounters();

    /**
     * Configures component by passing configuration parameters.
     * 
     * @param config    configuration parameters to be set.
     */
    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
        this._logger.configure(config);        
    } 

    /**
	 * Sets references to dependent components.
	 * 
	 * @param references 	references to locate the component dependencies. 
     */
    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._logger.setReferences(references);
        this._counters.setReferences(references);
    }
}
