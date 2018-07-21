"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const NullLock_1 = require("./NullLock");
const MemoryLock_1 = require("./MemoryLock");
const Factory_1 = require("../build/Factory");
class DefaultLockFactory extends Factory_1.Factory {
    constructor() {
        super();
        this.registerAsType(DefaultLockFactory.NullLockDescriptor, NullLock_1.NullLock);
        this.registerAsType(DefaultLockFactory.MemoryLockDescriptor, MemoryLock_1.MemoryLock);
    }
}
DefaultLockFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services", "factory", "lock", "default", "1.0");
DefaultLockFactory.NullLockDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "lock", "null", "*", "1.0");
DefaultLockFactory.MemoryLockDescriptor = new pip_services_commons_node_1.Descriptor("pip-services", "lock", "memory", "*", "1.0");
exports.DefaultLockFactory = DefaultLockFactory;
//# sourceMappingURL=DefaultLockFactory.js.map