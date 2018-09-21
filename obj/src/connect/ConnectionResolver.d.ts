import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { ConnectionParams } from './ConnectionParams';
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
export declare class ConnectionResolver {
    private readonly _connections;
    private _references;
    /**
     * @param config        ConfigParams (connections) to configure this object with.
     * @param references    references to the discovery services that should be used by this ConnectionResolver.
     *
     * @see [[configure]]
     * @see [[setReferences]]
     */
    constructor(config?: ConfigParams, references?: IReferences);
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
    setReferences(references: IReferences): void;
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
    configure(config: ConfigParams): void;
    /**
     * @returns a list of all connections that are stored in this ConnectionResolver.
     */
    getAll(): ConnectionParams[];
    /**
     * Adds a new connection to this ConnectionResolver's list of connections.
     *
     * @param connection    ConnectionParams for the connection that is to be added.
     *
     * @see [[ConnectionParams]]
     */
    add(connection: ConnectionParams): void;
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
    private resolveInDiscovery;
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
    resolve(correlationId: string, callback: (err: any, result: ConnectionParams) => void): void;
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
    private resolveAllInDiscovery;
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
    resolveAll(correlationId: string, callback: (err: any, result: ConnectionParams[]) => void): void;
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
    private registerInDiscovery;
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
    register(correlationId: string, connection: ConnectionParams, callback: (err: any) => void): void;
}
