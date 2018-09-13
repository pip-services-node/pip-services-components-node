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
 * 
 * ### Configuration parameters ###
 * 
 * Parameters to pass to the [[configure]] method for component configuration:
 * 
 * - "level" - the component logger's [[LogLevel]] (default is LogLevel.Info);
 * - "source" - the component logger's source.
 * - "dependencies" - section that is used to configure this service's dependency resolver. Should contain 
 * locators to dependencies.
 * 
 * ### References ###
 * 
 * Loggers (along with their context) and counters can be referenced by passing the 
 * following references to the object's [[setReferences]] method:
 * 
 * - Loggers: <code>"\*:logger:\*:\*:1.0"</code>;
 *     - Their context (source): <code>"\*:context-info:\*:\*:1.0"</code>;
 * - Counters: <code>"\*:counters:\*:\*:1.0"</code>;
 * - Other references that should be set in this object's dependency resolver.
 */
export class Component implements IConfigurable, IReferenceable {
    protected _dependencyResolver: DependencyResolver = new DependencyResolver();
    protected _logger: CompositeLogger = new CompositeLogger();
    protected _counters: CompositeCounters = new CompositeCounters();

    /**
     * Configures this component using the parameters provided.
     * 
     * __Configuration parameters:__
     * - "level" - the component logger's [[LogLevel]] (default is LogLevel.Info);
     * - "source" - the component logger's source;
     * - "dependencies" - section that is used to configure this service's dependency resolver. Should contain 
     * locators to dependencies.
     * 
     * @param config    the ConfigParams to use for component configuration.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
        this._logger.configure(config);        
    } 

    /**
     * Sets references to this component's loggers (along their context), counters, and adds 
     * references to this object's dependency resolver.
     * 
     * __References:__
     * - Loggers: <code>"\*:logger:\*:\*:1.0"</code>;
     *     - Their context (source): <code>"\*:context-info:\*:\*:1.0"</code>;
     * - Counters: <code>"\*:counters:\*:\*:1.0"</code>;
     * - Other references that should be set in this object's dependency resolver.
     * 
     * @param references    an IReferences object, containing references to a logger, a context, 
     *                      counters, and the references to set in the dependency resolver.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */
    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._logger.setReferences(references);
        this._counters.setReferences(references);
    }
}
