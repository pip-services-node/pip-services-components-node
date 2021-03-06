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
 * - __dependencies:__
 *     - [dependency name 1]: Dependency 1 locator (descriptor)
 *     - ...
 *     - [dependency name N]: Dependency N locator (descriptor)
 *
 * ### References ###
 *
 * - <code>\*:counters:\*:\*:1.0</code>     (optional) [[ICounters]] components to pass collected measurements
 * - <code>\*:logger:\*:\*:1.0</code>       (optional) [[ILogger]] components to pass log messages
 * - ...                                    References must match configured dependencies.
 */
export declare class Component implements IConfigurable, IReferenceable {
    protected _dependencyResolver: DependencyResolver;
    protected _logger: CompositeLogger;
    protected _counters: CompositeCounters;
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references: IReferences): void;
}
