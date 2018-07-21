import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { ConnectionParams } from './ConnectionParams';
import { IDiscovery } from './IDiscovery';
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
export declare class MemoryDiscovery implements IDiscovery, IReconfigurable {
    private _items;
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
    constructor(config?: ConfigParams);
    /**
     * Configures this object by calling {@link #readConnections}. Used to set the discovery service's static registery.
     *
     * @param config    ConfigParams to configure this object with.
     *
     * @see #readConnections
     * @see ConfigParams
     * @see IConfigurable
     */
    configure(config: ConfigParams): void;
    /**
     * Parses the connections passed as ConfigParams into this object's registry, which is used for
     * static discovery. The registry's keys will be identical to the ConfigParams' keys.
     *
     * @param connections   ConfigParams containing connection information.
     *
     * @see ConfigParams
     */
    readConnections(connections: ConfigParams): void;
    /**
     * Registers a connection to an end-point, using the key provided. Used for dynamic discovery.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to register the connection by.
     * @param connection        ConnectionParams for the given connection.
     * @param callback          callback function that will be called with an error or with the
     *                          result of the operation.
     */
    register(correlationId: string, key: string, connection: ConnectionParams, callback: (err: any, result: any) => void): void;
    /**
     * Resolves and returns a connection (the first one found) to the end-point that is registered by the given key.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the key to search for a connection by.
     * @param callback          callback function that will be called with an error or with the
     *                          ConnectionParams that were found.
     */
    resolveOne(correlationId: string, key: string, callback: (err: any, result: ConnectionParams) => void): void;
    /**
     * Resolves and returns all connections to the end-point that is registered by the given key.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the connection's key to search for.
     * @param callback          callback function that will be called with an error or with the
     *                          list of ConnectionParams that were found.
     */
    resolveAll(correlationId: string, key: string, callback: (err: any, result: ConnectionParams[]) => void): void;
}
