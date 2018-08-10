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
 * The root package of pip-services-components.
 */
export class Component implements IConfigurable, IReferenceable {
    protected _dependencyResolver: DependencyResolver = new DependencyResolver();
    protected _logger: CompositeLogger = new CompositeLogger();
    protected _counters: CompositeCounters = new CompositeCounters();

    /**
     * Uses the configuration parameters passed to configure the dependency resolver and logger.
     * 
     * @param config    the configuration parameters to use for configuration.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
        this._logger.configure(config);        
    } 

    /**
     * Sets references to this component's dependency resolver, logger, and performance counters.
     * 
     * @param references    an IReferences object, containing references to a dependency resolver, a "logger", and "counters".
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */
    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._logger.setReferences(references);
        this._counters.setReferences(references);
    }
}
