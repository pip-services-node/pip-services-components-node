import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { ConnectionParams } from './ConnectionParams';
/**
 * Helper class to retrieve component connections.
 *
 * If connections are configured to be retrieved from [[IDiscovery]],
 * it automatically locates [[IDiscovery]] in component references
 * and retrieve connections from there using discovery_key parameter.
 *
 * ### Configuration parameters ###
 *
 * - connection:
 *   - discovery_key:               (optional) a key to retrieve the connection from [[IDiscovery]]
 *   - ...                          other connection parameters
 *
 * - connections:                   alternative to connection
 *   - [connection params 1]:       first connection parameters
 *     - ...
 *   - [connection params N]:       Nth connection parameters
 *     - ...
 *
 * ### References ###
 *
 * - *:discovery:*:*:1.0            (optional) IDiscovery services
 *
 * @see [[ConnectionParams]]
 * @see [[IDiscovery]]
 *
 * ### Example ###
 *
 * let config = ConfigParams.fromTuples(
 *      "connection.host", "10.1.1.100",
 *      "connection.port", 8080
 * );
 *
 * let connectionResolver = new ConnectionResolver();
 * connectionResolver.configure(config);
 * connectionResolver.setReferences(references);
 *
 * connectionResolver.resolve("123", (err, connection) => {
 *      // Now use connection...
 * });
 */
export declare class ConnectionResolver {
    private readonly _connections;
    private _references;
    /**
     * Creates a new instance of connection resolver.
     *
     * @param config        (optional) component configuration parameters
     * @param references    (optional) component references
     */
    constructor(config?: ConfigParams, references?: IReferences);
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Sets references to dependent components.
     *
     * @param references 	references to locate the component dependencies.
     */
    setReferences(references: IReferences): void;
    /**
     * Gets all connections configured in component configuration.
     *
     * Redirect to Discovery services is not done at this point.
     * If you need fully fleshed connection use [[resolve]] method instead.
     *
     * @returns a list with connection parameters
     */
    getAll(): ConnectionParams[];
    /**
     * Adds a new connection to component connections
     *
     * @param connection    new connection parameters to be added
     */
    add(connection: ConnectionParams): void;
    private resolveInDiscovery;
    /**
     * Resolves a single component connection. If connections are configured to be retrieved
     * from Discovery service it finds a [[IDiscovery]] and resolves the connection there.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives resolved connection or error.
     *
     * @see [[IDiscovery]]
     */
    resolve(correlationId: string, callback: (err: any, result: ConnectionParams) => void): void;
    private resolveAllInDiscovery;
    /**
     * Resolves all component connection. If connections are configured to be retrieved
     * from Discovery service it finds a [[IDiscovery]] and resolves the connection there.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives resolved connections or error.
     *
     * @see [[IDiscovery]]
     */
    resolveAll(correlationId: string, callback: (err: any, result: ConnectionParams[]) => void): void;
    private registerInDiscovery;
    /**
     * Registers the given connection in all referenced discovery services.
     * This method can be used for dynamic service discovery.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param connection        a connection to register.
     * @param callback          callback function that receives registered connection or error.
     *
     * @see [[IDiscovery]]
     */
    register(correlationId: string, connection: ConnectionParams, callback: (err: any) => void): void;
}
