"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module info */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const Factory_1 = require("../build/Factory");
const ContextInfo_1 = require("./ContextInfo");
/**
 * Contains static read-only descriptors for ContextInfo and ContainerInfo (as well as a default "info" descriptor).
 *
 * @see [[Factory]]
 */
class DefaultInfoFactory extends Factory_1.Factory {
    /**
     * Create a new DefaultInfoFactory object, containing two [[ContextInfo]] object factories - one for ContextInfo and one
     * for ContainerInfo.
     *
     * @see [[ContextInfo]]
     */
    constructor() {
        super();
        this.registerAsType(DefaultInfoFactory.ContextInfoDescriptor, ContextInfo_1.ContextInfo);
        this.registerAsType(DefaultInfoFactory.ContainerInfoDescriptor, ContextInfo_1.ContextInfo);
    }
}
DefaultInfoFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services", "factory", "info", "default", "1.0");
DefaultInfoFactory.ContextInfoDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "context-info", "default", "*", "1.0");
DefaultInfoFactory.ContainerInfoDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "container-info", "default", "*", "1.0");
exports.DefaultInfoFactory = DefaultInfoFactory;
//# sourceMappingURL=DefaultInfoFactory.js.map