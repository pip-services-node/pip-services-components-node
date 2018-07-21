import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { CredentialParams } from './CredentialParams';
import { ICredentialStore } from './ICredentialStore';
/**
 * Credential store (see {@link ICredentialStore}) that maintains its registry of credentials ({@link CredentialParams})
 * in memory.
 *
 * @see ICredentialStore
 * @see CredentialParams
 */
export declare class MemoryCredentialStore implements ICredentialStore, IReconfigurable {
    private readonly _items;
    /**
     * Creates a MemoryCredentialStore object and configures it using the given ConfigParams. If no
     * ConfigParams are given, then the object must be configured using the {@link #configure} method,
     * or credentials must be stored using the {@link #store} method.
     *
     * @param config    ConfigParams to configure the new object with.
     *
     * @see #configure
     * @see #store
     * @see ConfigParams
     */
    constructor(config?: ConfigParams);
    /**
     * Configures this object by calling {@link #readCredentials}. Used to set the store's registery of credentials.
     *
     * @param config    ConfigParams to configure this object with.
     *
     * @see #readCredentials
     * @see ConfigParams
     * @see IConfigurable
     */
    configure(config: ConfigParams): void;
    /**
     * Parses the credentials passed as ConfigParams into this object's store, which is used for
     * looking up credentials. The store's keys will be identical to the ConfigParams' keys.
     *
     * @param credentials   ConfigParams containing credential information.
     *
     * @see ConfigParams
     */
    readCredentials(credentials: ConfigParams): void;
    /**
     * Stores credentials for a certain connection, using the key provided.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to register the credential by.
     * @param credential        CredentialParams for the given credential.
     * @param callback          callback function that will be called with an error, if one is risen.
     */
    store(correlationId: string, key: string, credential: CredentialParams, callback: (err: any) => void): void;
    /**
     * Looks up and returns the credentials (the first ones found) for the connection that is registered by the given key.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the key to search for a credential by.
     * @param callback          callback function that will be called with an error or with the
     *                          CredentialParams that were found.
     */
    lookup(correlationId: string, key: string, callback: (err: any, result: CredentialParams) => void): void;
}
