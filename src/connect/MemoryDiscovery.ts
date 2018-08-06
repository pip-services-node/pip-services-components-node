/** @module connect */
/** @hidden */ 
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';

import { ConnectionParams } from './ConnectionParams';
import { IDiscovery } from './IDiscovery';

/**
 * Used to store key-identifiable information about connections.
 */
class DiscoveryItem {
    public key: string;
    public connection: ConnectionParams;
}

/**
 * Discovery service (see [[IDiscovery]]) that stores its registry of connections ([[ConnectionParams]]) in memory. 
 * 
 * Supports both static and dynamic discovery.
 * 
 * - Static discovery: all services have static IP addresses (like a DNS, which also works using static discovery) 
 * that are registered from the start (using [[configure]]) and don't change along the way. As of late, 
 * static discovery has been used more often than dynamic, as it is simpler to use and more reliable 
 * (infrastructure does all of the hard work right out of the box).  
 * 
 * 
 * - Dynamic discovery: every time a service starts, it registers its address in the discovery service ("Service name" 
 * is available at "IP address") using [[register]]. Clients then ask to resolve the address by which the requested 
 * service can be reached. Dynamic discovery is more challenging to use than static discovery: if a service stops working, 
 * its address needs to be refreshed, stale addresses need to be cleaned, heartbeats must be used – many problems and 
 * challenges occur along the way.  
 * 
 * @see [[IDiscovery]]
 * @see [[ConnectionParams]]
 */
export class MemoryDiscovery implements IDiscovery, IReconfigurable {
    private _items: DiscoveryItem[] = [];

    /**
     * Creates a MemoryDiscovery object and configures it for static discovery using the given ConfigParams. If no 
     * ConfigParams are given, then the object must be configured using the [[configure]] method, or it must 
     * be used in dynamic discovery mode (using the [[register]] method).
     * 
     * @param config    ConfigParams to configure the new object with.
     * 
     * @see [[configure]]
     * @see [[register]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    public constructor(config: ConfigParams = null) {
        if (config != null)
            this.configure(config);
    }

    /**
     * Configures this object by calling [[readConnections]]. Used to set the discovery service's static registery.
     * 
     * @param config    ConfigParams to configure this object with.
     * 
     * @see [[readConnections]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" Package)
     */
    public configure(config: ConfigParams): void {
        this.readConnections(config);
    }

    /**
     * Parses the connections passed as ConfigParams into this object's registry, which is used for
     * static discovery. The registry's keys will be identical to the ConfigParams' keys.
     * 
     * @param connections   ConfigParams containing connection information.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     */
    public readConnections(connections: ConfigParams) {
        this._items = [];
        let keys = connections.getKeys();
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            let value = connections.getAsNullableString(key);
            let item: DiscoveryItem = new DiscoveryItem();
            item.key = key;
            item.connection = ConnectionParams.fromString(value);
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
    public register(correlationId: string, key: string, connection: ConnectionParams, callback: (err: any, result: any) => void): void {
        let item: DiscoveryItem = new DiscoveryItem();
        item.key = key;
        item.connection = connection;
        this._items.push(item);
        if (callback) callback(null, null);
    }

    /**
     * Resolves and returns a connection (the first one found) to the end-point that is registered by the given key.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the key to search for a connection by.
     * @param callback          callback function that will be called with an error or with the 
     *                          ConnectionParams that were found.
     */
    public resolveOne(correlationId: string, key: string, callback: (err: any, result: ConnectionParams) => void): void {
        let connection: ConnectionParams = null;
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
    public resolveAll(correlationId: string, key: string, callback: (err: any, result: ConnectionParams[]) => void): void {
        let connections: ConnectionParams[] = [];
        for (let index = 0; index < this._items.length; index++) {
            let item = this._items[index];
            if (item.key == key && item.connection != null)
                connections.push(item.connection);
        }
        callback(null, connections);
    }
}