/** @module auth */
/** @hidden */ 
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { StringValueMap } from 'pip-services-commons-node';

import { CredentialParams } from './CredentialParams';
import { ICredentialStore } from './ICredentialStore';

/**
 * Credential store (see [[ICredentialStore]]) that maintains its registry of credentials ([[CredentialParams]]) 
 * in memory. 
 * 
 * @see [[ICredentialStore]]
 * @see [[CredentialParams]]
 */
export class MemoryCredentialStore implements ICredentialStore, IReconfigurable {
    private readonly _items: StringValueMap = new StringValueMap();

    /**
     * Creates a MemoryCredentialStore object and configures it using the given ConfigParams. If no 
     * ConfigParams are given, then the object must be configured using the [[configure]] method, 
     * or credentials must be stored using the [[store]] method.
     * 
     * @param config    ConfigParams to configure the new object with.
     * 
     * @see [[configure]]
     * @see [[store]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public constructor(config: ConfigParams = null) {
        if (config != null)
            this.configure(config);
    }

    /**
     * Configures this object by calling [[readCredentials]]. Used to set the store's registery of credentials.
     * 
     * @param config    ConfigParams to configure this object with.
     * 
     * @see [[readCredentials]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
     */
    public configure(config: ConfigParams): void {
        this.readCredentials(config);
    }

    /**
     * Parses the credentials passed as ConfigParams into this object's store, which is used for
     * looking up credentials. The store's keys will be identical to the ConfigParams' keys.
     * 
     * @param credentials   ConfigParams containing credential information.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public readCredentials(credentials: ConfigParams) {
        this._items.clear();
        let keys = credentials.getKeys();
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            let value = credentials.getAsNullableString(key);
            this._items.put(key, CredentialParams.fromTuplesArray([key, value]));
        }
    }

    /**
     * Stores credentials for a certain connection, using the key provided. 
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param key               key to register the credential by.
     * @param credential        CredentialParams for the given credential.
     * @param callback          callback function that will be called with an error (if one is raised).
     */
    public store(correlationId: string, key: string, credential: CredentialParams, callback: (err: any) => void): void {
        if (credential != null)
            this._items.put(key, credential);
        else
            this._items.remove(key);

        if (callback) callback(null);
    }

    /**
     * Looks up and returns the credentials (the first ones found) for the connection that is registered by the given key.
     * 
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param key               the key to search for a credential by.
     * @param callback          callback function that will be called with an error or with the 
     *                          CredentialParams that were found.
     */
    public lookup(correlationId: string, key: string, callback: (err: any, result: CredentialParams) => void): void {
        let credential: any = this._items.getAsObject(key);
        callback(null, <CredentialParams>credential);
    }
}