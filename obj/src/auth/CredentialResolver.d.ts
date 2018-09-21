import { ConfigParams } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { CredentialParams } from './CredentialParams';
/**
 * Helper class that stores credential parameters ([[CredentialParams]]) and is capable of acquiring parameters
 * from various credential stores.
 *
 * @see [[CredentialParams]]
 * @see [[ICredentialStore]]
 */
export declare class CredentialResolver {
    private readonly _credentials;
    private _references;
    /**
     * @param config        ConfigParams (credentials) to configure this object with.
     * @param references    references to the credential stores that should be used by this CredentialResolver.
     *
     * @see [[configure]]
     * @see [[setReferences]]
     */
    constructor(config?: ConfigParams, references?: IReferences);
    /**
     * Sets the credential stores that this CredentialResolver references.
     *
     * @param references    references to set.
     */
    setReferences(references: IReferences): void;
    /**
     * Configures this object by converting the passed ConfigParams into a list of CredentialParams
     * and adding them to this CredentialResolver's list of credentials.
     *
     * @param config    credentials to add to this CredentialResolver's list of credentials.
     *
     * @see [[CredentialParams.manyFromConfig]]
     * @see [[CredentialParams]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipService's "Commons" Package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipService's "Commons" Package)
     */
    configure(config: ConfigParams): void;
    /**
     * @returns a list of all credentials that are stored in this CredentialResolver.
     */
    getAll(): CredentialParams[];
    /**
     * Adds a new credential to this CredentialResolver's list of credentials.
     *
     * @param credential    [[CredentialParams]] for the credential that is to be added.
     *
     * @see [[CredentialParams]]
     */
    add(credential: CredentialParams): void;
    /**
     * Looks up a credential for a given connection using the 'credential' parameter's
     * store key in the credential stores referenced.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param credential        CredentialParams that contain a store key, which will be used for
     *                          looking up credentials.
     * @param callback          callback function that will be called with an error or with the
     *                          first CredentialParams found. Null will be returned if the credential
     *                          does not have a key, or there are no references set.
     * @throws a ReferenceException if no valid "credential-store" services are referenced.
     */
    lookupInStores(correlationId: string, credential: CredentialParams, callback: (err: any, result: CredentialParams) => void): void;
    /**
     * Looks up a credential in this CredentialResolver using its list of credentials ([[CredentialParams]])
     * and the credential stores ([[ICredentialStore]]) referenced.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param callback          callback function that will be called with an error or with the
     *                          return value. Returns: the first credential found that does not
     *                          need to be looked up in a credential store or the first credential
     *                          successfully looked up in a credential store. Returns null
     *                          if no credentials were found.
     */
    lookup(correlationId: string, callback: (err: any, result: CredentialParams) => void): void;
}
