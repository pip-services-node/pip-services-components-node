"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const CompositeLogger_1 = require("./log/CompositeLogger");
const CompositeCounters_1 = require("./count/CompositeCounters");
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
class Component {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_1.DependencyResolver();
        this._logger = new CompositeLogger_1.CompositeLogger();
        this._counters = new CompositeCounters_1.CompositeCounters();
    }
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config) {
        this._dependencyResolver.configure(config);
        this._logger.configure(config);
    }
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._logger.setReferences(references);
        this._counters.setReferences(references);
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map