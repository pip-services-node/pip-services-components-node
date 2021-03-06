"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module config */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Factory_1 = require("../build/Factory");
const MemoryConfigReader_1 = require("./MemoryConfigReader");
const JsonConfigReader_1 = require("./JsonConfigReader");
const YamlConfigReader_1 = require("./YamlConfigReader");
/**
 * Creates [[IConfigReader]] components by their descriptors.
 *
 * @see [[Factory]]
 * @see [[MemoryConfigReader]]
 * @see [[JsonConfigReader]]
 * @see [[YamlConfigReader]]
 */
class DefaultConfigReaderFactory extends Factory_1.Factory {
    /**
     * Create a new instance of the factory.
     */
    constructor() {
        super();
        this.registerAsType(DefaultConfigReaderFactory.MemoryConfigReaderDescriptor, MemoryConfigReader_1.MemoryConfigReader);
        this.registerAsType(DefaultConfigReaderFactory.JsonConfigReaderDescriptor, JsonConfigReader_1.JsonConfigReader);
        this.registerAsType(DefaultConfigReaderFactory.YamlConfigReaderDescriptor, YamlConfigReader_1.YamlConfigReader);
    }
}
DefaultConfigReaderFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services", "factory", "config-reader", "default", "1.0");
DefaultConfigReaderFactory.MemoryConfigReaderDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "config-reader", "memory", "*", "1.0");
DefaultConfigReaderFactory.JsonConfigReaderDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "config-reader", "json", "*", "1.0");
DefaultConfigReaderFactory.YamlConfigReaderDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "config-reader", "yaml", "*", "1.0");
exports.DefaultConfigReaderFactory = DefaultConfigReaderFactory;
//# sourceMappingURL=DefaultConfigReaderFactory.js.map