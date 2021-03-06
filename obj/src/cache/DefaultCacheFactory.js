"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module cache */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Factory_1 = require("../build/Factory");
const NullCache_1 = require("./NullCache");
const MemoryCache_1 = require("./MemoryCache");
/**
 * Creates [[ICache]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[ICache]]
 * @see [[MemoryCache]]
 * @see [[NullCache]]
 */
class DefaultCacheFactory extends Factory_1.Factory {
    /**
     * Create a new instance of the factory.
     */
    constructor() {
        super();
        this.registerAsType(DefaultCacheFactory.MemoryCacheDescriptor, MemoryCache_1.MemoryCache);
        this.registerAsType(DefaultCacheFactory.NullCacheDescriptor, NullCache_1.NullCache);
    }
}
DefaultCacheFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services", "factory", "cache", "default", "1.0");
DefaultCacheFactory.NullCacheDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "cache", "null", "*", "1.0");
DefaultCacheFactory.MemoryCacheDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "cache", "memory", "*", "1.0");
exports.DefaultCacheFactory = DefaultCacheFactory;
//# sourceMappingURL=DefaultCacheFactory.js.map