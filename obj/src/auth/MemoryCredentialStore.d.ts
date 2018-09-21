import { ConfigParams } from 'pip-services-commons-node';
import { IReconfigurable } from 'pip-services-commons-node';
import { CredentialParams } from './CredentialParams';
import { ICredentialStore } from './ICredentialStore';
/**
 * Credential store that keeps credentials in memory.
 *
 * ### Configuration parameters ###
 *
 * - [credential key 1]:
 *   - ...                          credential parameters for key 1
 * - [credential key 2]:
 *   - ...                          credential parameters for key N
 *
 * ### Example ###
 *
 * let config = ConfigParams.fromTuples(
 *      "key1.user", "jdoe",
 *      "key1.pass", "pass123",
 *      "key2.user", "bsmith",
 *      "key2.pass", "mypass"
 * );
 *
 * let credentialStore = new MemoryCredentialStore();
 * credentialStore.readCredentials(config);
 *
 * credentialStore.lookup("123", "key1", (err, credential) => {
 *      // Result: user=jdoe;pass=pass123
 * });
 *
 * @see [[ICredentialStore]]
 * @see [[CredentialParams]]
 */
export declare class MemoryCredentialStore implements ICredentialStore, IReconfigurable {
    private readonly _items;
    /**
     * Creates a new instance of the credential store.
     *
     * @param config    (optional) configuration with credential parameters.
     */
    constructor(config?: ConfigParams);
    /**
     * Configures object by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Reads credentials from configuration parameters.
     * Each section represents an individual CredentialParams
     *
     * @param config   configuration parameters to be read
     */
    readCredentials(config: ConfigParams): void;
    /**
     * Stores credential parameters into the store.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a key to uniquely identify the credential parameters.
     * @param credential        a credential parameters to be stored.
     * @param callback 			callback function that receives an error or null for success.
     */
    store(correlationId: string, key: string, credential: CredentialParams, callback: (err: any) => void): void;
    /**
     * Lookups credential parameters by its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               a key to uniquely identify the credential parameters.
     * @param callback          callback function that receives found credential parameters or error.
     */
    lookup(correlationId: string, key: string, callback: (err: any, result: CredentialParams) => void): void;
}
