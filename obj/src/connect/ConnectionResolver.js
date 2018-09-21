"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module connect */
/** @hidden */
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const ConnectionParams_1 = require("./ConnectionParams");
/**
 * Helper class that stores connection parameters ([[ConnectionParams]]) and is capable of acquiring parameters
 * from various discovery services.
 *
 * ### Configuration parameters ###
 *
 * Parameters to pass to the [[configure]] method for component configuration:
 *
 * - __"connection(s)"__
 *     - "connection.discovery_key" - the key to use for connection resolving in a discovery service;
 *     - "connection.protocol" - the connection's protocol;
 *     - "connection.host" - the target host;
 *     - "connection.port" - the target port;
 *     - "connection.uri" - the target URI.
 *
 * ### References ###
 *
 * A discovery service can be referenced by passing the following reference
 * to the object's [[setReferences]] method:
 *
 * - <code>"\*:discovery:\*:\*:1.0"</code>
 *
 * @see [[ConnectionParams]]
 * @see [[IDiscovery]]
 *
 * ### Example ###
 *
 * Example ConnectionResolver object usage:
 *
 *     public MyMethod() {
 *         let config = ConfigParams.fromTuples(
 *             "connection.protocol", "http",
 *             "connection.host", "localhost",
 *             "connection.port", 3000
 *         );
 *
 *         let conectionResolver = new ConnectionResolver(config);
 *         ...
 *
 *         let connection = new ConnectionParams();
 *         conectionResolver.register("correlationId", connection);
 *         ...
 *     }
 */
class ConnectionResolver {
    /**
     * @param config        ConfigParams (connections) to configure this object with.
     * @param references    references to the discovery services that should be used by this ConnectionResolver.
     *
     * @see [[configure]]
     * @see [[setReferences]]
     */
    constructor(config = null, references = null) {
        this._connections = [];
        this._references = null;
        if (config != null)
            this.configure(config);
        if (references != null)
            this.setReferences(references);
    }
    /**
     * Sets a reference to this ConnectionResolver's discovery service.
     *
     * __References:__
     * - <code>"\*:discovery:\*:\*:1.0"</code>
     *
     * @param references    an IReferences object, containing the discovery service reference to set.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package)
     */
    setReferences(references) {
        this._references = references;
    }
    /**
     * Configures this object by parsing the "connection(s)" section of the passed ConfigParams
     * into a list of ConnectionParams and adding them to this ConnectionResolver's list of connections.
     *
     * __Connection parameters:__
     * - __"connection(s)"__
     *     - "connection.discovery_key" - the key to use for connection resolving in a discovery service;
     *     - "connection.protocol" - the connection's protocol;
     *     - "connection.host" - the target host;
     *     - "connection.port" - the target port;
     *     - "connection.uri" - the target URI.
     *
     * @param config    the "connection(s)" to add to this ConnectionResolver's list of connections.
     *
     * @see [[ConnectionParams.manyFromConfig]]
     * @see [[ConnectionParams]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
     */
    configure(config) {
        let connections = ConnectionParams_1.ConnectionParams.manyFromConfig(config);
        this._connections.push(...connections);
    }
    /**
     * @returns a list of all connections that are stored in this ConnectionResolver.
     */
    getAll() {
        return this._connections;
    }
    /**
     * Adds a new connection to this ConnectionResolver's list of connections.
     *
     * @param connection    ConnectionParams for the connection that is to be added.
     *
     * @see [[ConnectionParams]]
     */
    add(connection) {
        this._connections.push(connection);
    }
    /**
     * Private method that resolves a connection to a given end-point using the 'connection' parameter's
     * discovery key in the discovery services referenced.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param connection        ConnectionParams that contain a discovery key, which will be used for
     *                          resolving connections.
     * @param callback          callback function that will be called with an error or with the
     *                          first ConnectionParams found. Null will be returned if the connection
     *                          does not have a key, or there are no references set.
     * @throws a ReferenceException if no valid "discovery" services are referenced.
     */
    resolveInDiscovery(correlationId, connection, callback) {
        if (!connection.useDiscovery()) {
            callback(null, null);
            return;
        }
        let key = connection.getDiscoveryKey();
        if (this._references == null) {
            callback(null, null);
            return;
        }
        let discoveryDescriptor = new pip_services_commons_node_3.Descriptor("*", "discovery", "*", "*", "*");
        let discoveries = this._references.getOptional(discoveryDescriptor);
        if (discoveries.length == 0) {
            let err = new pip_services_commons_node_2.ReferenceException(correlationId, discoveryDescriptor);
            callback(err, null);
            return;
        }
        let firstResult = null;
        async.any(discoveries, (discovery, callback) => {
            let discoveryTyped = discovery;
            discoveryTyped.resolveOne(correlationId, key, (err, result) => {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = result;
                    callback(err, true);
                }
            });
        }, (err) => {
            callback(err, firstResult);
        });
    }
    /**
     * Resolves a connection in this ConnectionResolver using its list of connections ([[ConnectionParams]])
     * and the discovery services ([[IDiscovery]]) referenced.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback          callback function that will be called with an error or with the
     *                          return value. Returns: the first connection found that does not
     *                          need to be resolved in a discovery service or the first connection
     *                          successfully resolved in a discovery service. Returns null
     *                          if no connections were resolved.
     */
    resolve(correlationId, callback) {
        if (this._connections.length == 0) {
            callback(null, null);
            return;
        }
        let connections = [];
        for (let index = 0; index < this._connections.length; index++) {
            if (!this._connections[index].useDiscovery()) {
                callback(null, this._connections[index]); //If a connection is not configured for discovery use - return it.
                return;
            }
            else {
                connections.push(this._connections[index]); //Otherwise, add it to the list of connections to resolve.
            }
        }
        if (connections.length == 0) {
            callback(null, null);
            return;
        }
        let firstResult = null;
        async.any(connections, (connection, callback) => {
            this.resolveInDiscovery(correlationId, connection, (err, result) => {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = new ConnectionParams_1.ConnectionParams(pip_services_commons_node_1.ConfigParams.mergeConfigs(connection, result));
                    callback(err, true);
                }
            });
        }, (err) => {
            callback(err, firstResult);
        });
    }
    /**
     * Private method that resolves all of the connections to a given end-point using the 'connection'
     * parameter's discovery key in the discovery services referenced.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param connection        ConnectionParams that contain a discovery key, which will be used for
     *                          resolving connections.
     * @param callback          callback function that will be called with an error or with the
     *                          list of ConnectionParams that were found in the referenced discovery
     *                          services using the 'connection' parameter's discovery key.
     * @throws a ReferenceException if no "discovery" services are referenced.
     */
    resolveAllInDiscovery(correlationId, connection, callback) {
        let resolved = [];
        let key = connection.getDiscoveryKey();
        if (!connection.useDiscovery()) {
            callback(null, []);
            return;
        }
        if (this._references == null) {
            callback(null, []);
            return;
        }
        let discoveryDescriptor = new pip_services_commons_node_3.Descriptor("*", "discovery", "*", "*", "*");
        let discoveries = this._references.getOptional(discoveryDescriptor);
        if (discoveries.length == 0) {
            let err = new pip_services_commons_node_2.ReferenceException(correlationId, discoveryDescriptor);
            callback(err, null);
            return;
        }
        async.each(discoveries, (discovery, callback) => {
            let discoveryTyped = discovery;
            discoveryTyped.resolveAll(correlationId, key, (err, result) => {
                if (err || result == null) {
                    callback(err);
                }
                else {
                    resolved = resolved.concat(result);
                    callback(null);
                }
            });
        }, (err) => {
            callback(err, resolved);
        });
    }
    /**
     * Resolves all connections that:
     * - are stored in this ConnectionResolver and do not need to be resolved in a discovery service;
     * - are resolved in referenced discovery services ([[IDiscovery]]) using the discovery keys stored in the ConnectionResolver's
     * connections ([[ConnectionParams]]).
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback          callback function that will be called with an error or with the
     *                          list of ConnectionParams resolved.
     */
    resolveAll(correlationId, callback) {
        let resolved = [];
        let toResolve = [];
        for (let index = 0; index < this._connections.length; index++) {
            if (this._connections[index].useDiscovery())
                toResolve.push(this._connections[index]);
            else
                resolved.push(this._connections[index]);
        }
        if (toResolve.length <= 0) {
            callback(null, resolved);
            return;
        }
        async.each(toResolve, (connection, callback) => {
            this.resolveAllInDiscovery(correlationId, connection, (err, result) => {
                if (err) {
                    callback(err);
                }
                else {
                    for (let index = 0; index < result.length; index++) {
                        let localResolvedConnection = new ConnectionParams_1.ConnectionParams(pip_services_commons_node_1.ConfigParams.mergeConfigs(connection, result[index]));
                        resolved.push(localResolvedConnection);
                    }
                    callback(null);
                }
            });
        }, (err) => {
            callback(err, resolved);
        });
    }
    /**
     * Private method that registers the given connection in all referenced discovery services.
     * Used for dynamic discovery (described in [[MemoryDiscovery]]).
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param connection        connection to register in the discovery services.
     * @param callback          callback function that will be called with an error or with a
     *                          boolean result (successful or not).
     *
     * @see [[MemoryDiscovery]]
     */
    registerInDiscovery(correlationId, connection, callback) {
        if (!connection.useDiscovery()) {
            if (callback)
                callback(null, false);
            return;
        }
        var key = connection.getDiscoveryKey();
        if (this._references == null) {
            if (callback)
                callback(null, false);
            return;
        }
        var discoveries = this._references.getOptional(new pip_services_commons_node_3.Descriptor("*", "discovery", "*", "*", "*"));
        if (discoveries == null) {
            if (callback)
                callback(null, false);
            return;
        }
        async.each(discoveries, (discovery, callback) => {
            discovery.register(correlationId, key, connection, (err, result) => {
                callback(err);
            });
        }, (err) => {
            if (callback)
                callback(err, err == null);
        });
    }
    /**
     * Registers the given connection in all referenced discovery services. Used for dynamic discovery
     * (described in [[MemoryDiscovery]]).
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param connection        connection to register in the discovery services.
     * @param callback          callback function that will be called with an error (if one is raised).
     *
     * @see [[MemoryDiscovery]]
     */
    register(correlationId, connection, callback) {
        this.registerInDiscovery(correlationId, connection, (err, result) => {
            if (result)
                this._connections.push(connection);
            if (callback)
                callback(err);
        });
    }
}
exports.ConnectionResolver = ConnectionResolver;
//# sourceMappingURL=ConnectionResolver.js.map