import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { ConnectionParams } from './ConnectionParams';
/**
 * Helper class that stores connection parameters ([[ConnectionParams]]) and is capable of acquiring parameters
 * from various discovery services.
 *
 * @see [[ConnectionParams]]
 * @see [[IDiscovery]]
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
     * Sets the discovery services that this ConnectionResolver references.
     *
     * @param references    references to set.
     */
    setReferences(references: IReferences): void;
    /**
     * Configures this object by converting the passed ConfigParams into a list of ConnectionParams
     * and adding them to this ConnectionResolver's list of connections.
     *
     * @param config    connections to add to this ConnectionResolver's list of connections.
     *
     * @see [[ConnectionParams.manyFromConfig]]
     * @see [[ConnectionParams]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" Package)
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
     * @param correlationId     unique business transaction id to trace calls across components.
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
     * @param correlationId     unique business transaction id to trace calls across components.
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
     * @param correlationId     unique business transaction id to trace calls across components.
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
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param callback          callback function that will be called with an error or with the
     *                          list of ConnectionParams resolved.
     */
    resolveAll(correlationId: string, callback: (err: any, result: ConnectionParams[]) => void): void;
    /**
     * Private method that registers the given connection in all referenced discovery services.
     * Used for dynamic discovery (described in [[MemoryDiscovery]]).
     *
     * @param correlationId     unique business transaction id to trace calls across components.
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
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param connection        connection to register in the discovery services.
     * @param callback          callback function that will be called with an error (if one is raised).
     *
     * @see [[MemoryDiscovery]]
     */
    register(correlationId: string, connection: ConnectionParams, callback: (err: any) => void): void;
}
