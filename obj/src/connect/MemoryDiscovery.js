"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const ConnectionParams_1 = require("./ConnectionParams");
class DiscoveryItem {
}
/**
 * Discovery service (see {@link IDiscovery}) that stores its registry of connections ({@link ConnectionParams}) in memory.
 *
 * Supports both static and dynamic discovery.
 *
 * - Static discovery: all services have static IP addresses (like a DNS, which also works using static discovery)
 * that are registered from the start (using {@link #configure}) and don't change along the way. As of late,
 * static discovery has been used more often than dynamic, as it is simpler to use and more reliable
 * (infrastructure does all of the hard work right out of the box).
 *
 *
 * - Dynamic discovery: every time a service starts, it registers its address in the discovery service ("Service name"
 * is available at "IP address") using {@link #register}. Clients then ask to resolve the address by which the requested
 * service can be reached. Dynamic discovery is more challenging to use than static discovery: if a service stops working,
 * its address needs to be refreshed, stale addresses need to be cleaned, heartbeats must be used – many problems and
 * challenges occur along the way.
 *
 * @see IDiscovery
 * @see ConnectionParams
 */
class MemoryDiscovery {
    /**
     * Creates a MemoryDiscovery object and configures it for static discovery using the given ConfigParams. If no
     * ConfigParams are given, then the object must be configured using the {@link #configure} method, or it must
     * be used in dynamic discovery mode (using the {@link #register} method).
     *
     * @param config    ConfigParams to configure the new object with.
     *
     * @see #configure
     * @see #register
     * @see ConfigParams
     */
    constructor(config = null) {
        this._items = [];
        if (config != null)
            this.configure(config);
    }
    /**
     * Configures this object by calling {@link #readConnections}. Used to set the discovery service's static registery.
     *
     * @param config    ConfigParams to configure this object with.
     *
     * @see #readConnections
     * @see ConfigParams
     * @see IConfigurable
     */
    configure(config) {
        this.readConnections(config);
    }
    /**
     * Parses the connections passed as ConfigParams into this object's registry, which is used for
     * static discovery. The registry's keys will be identical to the ConfigParams' keys.
     *
     * @param connections   ConfigParams containing connection information.
     *
     * @see ConfigParams
     */
    readConnections(connections) {
        this._items = [];
        let keys = connections.getKeys();
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            let value = connections.getAsNullableString(key);
            let item = new DiscoveryItem();
            item.key = key;
            item.connection = ConnectionParams_1.ConnectionParams.fromString(value);
            this._items.push(item);
        }
    }
    /**
     * Registers a connection to an end-point, using the key provided. Used for dynamic discovery.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to register the connection by.
     * @param connection        ConnectionParams for the given connection.
     * @param callback          callback function that will be called with an error or with the
     *                          result of the operation.
     */
    register(correlationId, key, connection, callback) {
        let item = new DiscoveryItem();
        item.key = key;
        item.connection = connection;
        this._items.push(item);
        if (callback)
            callback(null, null);
    }
    /**
     * Resolves and returns a connection (the first one found) to the end-point that is registered by the given key.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the key to search for a connection by.
     * @param callback          callback function that will be called with an error or with the
     *                          ConnectionParams that were found.
     */
    resolveOne(correlationId, key, callback) {
        let connection = null;
        for (let index = 0; index < this._items.length; index++) {
            let item = this._items[index];
            if (item.key == key && item.connection != null) {
                connection = item.connection;
                break;
            }
        }
        callback(null, connection);
    }
    /**
     * Resolves and returns all connections to the end-point that is registered by the given key.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the connection's key to search for.
     * @param callback          callback function that will be called with an error or with the
     *                          list of ConnectionParams that were found.
     */
    resolveAll(correlationId, key, callback) {
        let connections = [];
        for (let index = 0; index < this._items.length; index++) {
            let item = this._items[index];
            if (item.key == key && item.connection != null)
                connections.push(item.connection);
        }
        callback(null, connections);
    }
}
exports.MemoryDiscovery = MemoryDiscovery;
//# sourceMappingURL=MemoryDiscovery.js.map