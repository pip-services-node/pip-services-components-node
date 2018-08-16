"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module count */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const NullCounters_1 = require("./NullCounters");
const LogCounters_1 = require("./LogCounters");
const CompositeCounters_1 = require("./CompositeCounters");
const Factory_1 = require("../build/Factory");
/**
 * Contains static read-only descriptors for the [[NullCounters Null]], [[LogCounters Log]],
 * and [[CompositeCounters Composite]] Counters (as well as a default "counters" descriptor).
 *
 * @see [[Factory]]
 */
class DefaultCountersFactory extends Factory_1.Factory {
    /**
     * Create a new DefaultCountersFactory object, containing [[NullCounters]], [[LogCounters]],
     * and [[CompositeCounters]] object factories.
     *
     * @see [[NullCounters]]
     * @see [[LogCounters]]
     * @see [[CompositeCounters]]
     */
    constructor() {
        super();
        this.registerAsType(DefaultCountersFactory.NullCountersDescriptor, NullCounters_1.NullCounters);
        this.registerAsType(DefaultCountersFactory.LogCountersDescriptor, LogCounters_1.LogCounters);
        this.registerAsType(DefaultCountersFactory.CompositeCountersDescriptor, CompositeCounters_1.CompositeCounters);
    }
}
DefaultCountersFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services", "factory", "counters", "default", "1.0");
DefaultCountersFactory.NullCountersDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "counters", "null", "*", "1.0");
DefaultCountersFactory.LogCountersDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "counters", "log", "*", "1.0");
DefaultCountersFactory.CompositeCountersDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "counters", "composite", "*", "1.0");
exports.DefaultCountersFactory = DefaultCountersFactory;
//# sourceMappingURL=DefaultCountersFactory.js.map