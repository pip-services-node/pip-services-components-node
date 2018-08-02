"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const CompositeLogger_1 = require("./log/CompositeLogger");
const CompositeCounters_1 = require("./count/CompositeCounters");
/**
 * The root package of pip-services-components.
 */
class Component {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_1.DependencyResolver();
        this._logger = new CompositeLogger_1.CompositeLogger();
        this._counters = new CompositeCounters_1.CompositeCounters();
    }
    /**
     * Uses the configuration parameters passed to configure the dependency resolver and logger.
     *
     * @param config    the configuration parameters to use for configuration.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    configure(config) {
        this._dependencyResolver.configure(config);
        this._logger.configure(config);
    }
    /**
     * Uses the 'references' passed to set the dependency resolver's, logger's, and
     * counters' references.
     *
     * @param references    the references to set.
     */
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._logger.setReferences(references);
        this._counters.setReferences(references);
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map