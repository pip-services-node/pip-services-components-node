"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Factory_1 = require("../build/Factory");
const MemoryDiscovery_1 = require("./MemoryDiscovery");
/**
 * Contains static read-only descriptors for MemoryDiscovery (as well as a default discovery descriptor).
 *
 * @see Factory
 */
class DefaultDiscoveryFactory extends Factory_1.Factory {
    /**
     * Adds an object factory for MemoryDiscovery to this Factory.
     *
     * @see Factory#Factory
     */
    constructor() {
        super();
        this.registerAsType(DefaultDiscoveryFactory.MemoryDiscoveryDescriptor, MemoryDiscovery_1.MemoryDiscovery);
    }
}
DefaultDiscoveryFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services", "factory", "discovery", "default", "1.0");
DefaultDiscoveryFactory.MemoryDiscoveryDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "discovery", "memory", "*", "1.0");
exports.DefaultDiscoveryFactory = DefaultDiscoveryFactory;
//# sourceMappingURL=DefaultDiscoveryFactory.js.map