"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module lock */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const NullLock_1 = require("./NullLock");
const MemoryLock_1 = require("./MemoryLock");
const Factory_1 = require("../build/Factory");
/**
 * Contains static read-only descriptors for [[NullLock]] and [[MemoryLock]] (as well as a default "lock" descriptor).
 *
 * @see [[Factory]]
 */
class DefaultLockFactory extends Factory_1.Factory {
    /**
     * Create a new DefaultLockFactory object, containing [[NullLock]] and [[MemoryLock]] object factories.
     *
     * @see [[NullLock]]
     * @see [[MemoryLock]]
     */
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