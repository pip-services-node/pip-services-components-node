import { CredentialParams } from './CredentialParams';

/**
 * The role of a Credential store is to maintain a registry of various credential parameters (what usernames and 
 * passwords to use when connecting to certain end-points). These parameters are necessary for authentication and 
 * authorization (when connecting to other services) and do not contain infomation about the end-points themselves 
 * (host's address, port, etc. - see {@link ConnectionParams}).
 * 
 * This interface can be used for creating credential stores, which can save and retrieve various credential parameters.  
 * 
 * @see CredentialParams
 * @see ConnectionParams
 */
export interface ICredentialStore {
    /**
     * Abstract method that will contain the logic for storing the credentials for a certain connection in this 
     * store, using the key provided.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to store the credentials by.
     * @param credential        CredentialParams of the credential to be stored.
     * @param callback          callback function that will be called with an error, if one is raised.
     */
    store(correlationId: string, key: String, credential: CredentialParams, callback: (err: any) => void): void;

    /**
     * Abstract method that will contain the logic for looking up credentials, using the key provided.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               the credential's key to search for.
     * @param callback          callback function that will be called with an error or with the 
     *                          CredentialParams that were found.
     */
    lookup(correlationId: string, key: string, callback: (err: any, result: CredentialParams) => void): void;
}