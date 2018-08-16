"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module log */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const NullLogger_1 = require("./NullLogger");
const ConsoleLogger_1 = require("./ConsoleLogger");
const CompositeLogger_1 = require("./CompositeLogger");
const Factory_1 = require("../build/Factory");
/**
 * Contains static read-only descriptors for the [[NullLogger Null]], [[ConsoleLogger Console]],
 * and [[CompositeLogger Composite]] Loggers (as well as a default "logger" descriptor).
 *
 * @see [[Factory]]
 */
class DefaultLoggerFactory extends Factory_1.Factory {
    /**
     * Create a new DefaultLoggerFactory object, containing [[NullLogger]], [[ConsoleLogger]],
     * and [[CompositeLogger]] object factories.
     *
     * @see [[NullLogger]]
     * @see [[ConsoleLogger]]
     * @see [[CompositeLogger]]
     */
    constructor() {
        super();
        this.registerAsType(DefaultLoggerFactory.NullLoggerDescriptor, NullLogger_1.NullLogger);
        this.registerAsType(DefaultLoggerFactory.ConsoleLoggerDescriptor, ConsoleLogger_1.ConsoleLogger);
        this.registerAsType(DefaultLoggerFactory.CompositeLoggerDescriptor, CompositeLogger_1.CompositeLogger);
    }
}
DefaultLoggerFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services", "factory", "logger", "default", "1.0");
DefaultLoggerFactory.NullLoggerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "logger", "null", "*", "1.0");
DefaultLoggerFactory.ConsoleLoggerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "logger", "console", "*", "1.0");
DefaultLoggerFactory.CompositeLoggerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "logger", "composite", "*", "1.0");
exports.DefaultLoggerFactory = DefaultLoggerFactory;
//# sourceMappingURL=DefaultLoggerFactory.js.map