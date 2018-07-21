import { ConnectionParams } from './ConnectionParams';

/**
 * The role of a Discovery service is to store a registry of various end-points (what services are where, and how to connect 
 * to them - similar to a DNS). It contains information about the end-points themselves, but does not have the credentials 
 * to connect to them (separated for security reasons - see {@link CredentialParams}). 
 * 
 * This interface can be used for creating discovery services (connection registeries).
 * 
 * @see ConnectionParams
 * @see CredentialParams
 */
export interface IDiscovery {
    /**
     * Abstract method that will contain the logic for registering the connection to an end-point, using the key provided.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to register the connection by.
     * @param connection        ConnectionParams of the connection to be registered.
     * @param callback          callback function that will be called with an error or with the result.
     */
    register(correlationId: string, key: string, connection: ConnectionParams, callback: (err: any, result: any) => void): void;

    /**
     * Abstract method that will contain the logic for resolving a connection (the first one found), using the key provided.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the connection's key to search for.
     * @param callback          callback function that will be called with an error or with the 
     *                          ConnectionParams that were found.
     */
    resolveOne(correlationId: string, key: string, callback: (err: any, result: ConnectionParams) => void): void;

    /**
     * Abstract method that will contain the logic for resolving all connections that are registered by the key provided 
     * (since a service can have multiple corresponding addresses).
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the connection's key to search for.
     * @param callback          callback function that will be called with an error or with the 
     *                          list of ConnectionParams that were found.
     */
    resolveAll(correlationId: string, key: string, callback: (err: any, result: ConnectionParams[]) => void): void;
}