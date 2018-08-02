"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module auth */
/** @hidden */
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const CredentialParams_1 = require("./CredentialParams");
/**
 * Helper class that stores credential parameters ([[CredentialParams]]) and is capable of acquiring parameters
 * from various credential stores.
 *
 * @see [[CredentialParams]]
 * @see [[ICredentialStore]]
 */
class CredentialResolver {
    /**
     * @param config        ConfigParams (credentials) to configure this object with.
     * @param references    references to the credential stores that should be used by this CredentialResolver.
     *
     * @see [[configure]]
     * @see [[setReferences]]
     */
    constructor(config = null, references = null) {
        this._credentials = [];
        this._references = null;
        if (config != null)
            this.configure(config);
        if (references != null)
            this.setReferences(references);
    }
    /**
     * Sets the credential stores that this CredentialResolver references.
     *
     * @param references    references to set.
     */
    setReferences(references) {
        this._references = references;
    }
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
    configure(config) {
        let credentials = CredentialParams_1.CredentialParams.manyFromConfig(config);
        this._credentials.push(...credentials);
    }
    /**
     * @returns a list of all credentials that are stored in this CredentialResolver.
     */
    getAll() {
        return this._credentials;
    }
    /**
     * Adds a new credential to this CredentialResolver's list of credentials.
     *
     * @param credential    [[CredentialParams]] for the credential that is to be added.
     *
     * @see [[CredentialParams]]
     */
    add(credential) {
        this._credentials.push(credential);
    }
    /**
     * Looks up a credential for a given connection using the 'credential' parameter's
     * store key in the credential stores referenced.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param credential        CredentialParams that contain a store key, which will be used for
     *                          looking up credentials.
     * @param callback          callback function that will be called with an error or with the
     *                          first CredentialParams found. Null will be returned if the credential
     *                          does not have a key, or there are no references set.
     * @throws a ReferenceException if no valid "credential-store" services are referenced.
     */
    lookupInStores(correlationId, credential, callback) {
        if (!credential.useCredentialStore()) {
            callback(null, null);
            return;
        }
        let key = credential.getStoreKey();
        if (this._references == null) {
            callback(null, null);
            return;
        }
        let storeDescriptor = new pip_services_commons_node_2.Descriptor("*", "credential-store", "*", "*", "*");
        let components = this._references.getOptional(storeDescriptor);
        if (components.length == 0) {
            let err = new pip_services_commons_node_1.ReferenceException(correlationId, storeDescriptor);
            callback(err, null);
            return;
        }
        let firstResult = null;
        async.any(components, (component, callback) => {
            let store = component;
            store.lookup(correlationId, key, (err, result) => {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = result;
                    callback(err, true);
                }
            });
        }, (err) => {
            if (callback)
                callback(err, firstResult);
        });
    }
    /**
     * Looks up a credential in this CredentialResolver using its list of credentials ([[CredentialParams]])
     * and the credential stores ([[ICredentialStore]]) referenced.
     *
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param callback          callback function that will be called with an error or with the
     *                          return value. Returns: the first credential found that does not
     *                          need to be looked up in a credential store or the first credential
     *                          successfully looked up in a credential store. Returns null
     *                          if no credentials were found.
     */
    lookup(correlationId, callback) {
        if (this._credentials.length == 0) {
            if (callback)
                callback(null, null);
            return;
        }
        let lookupCredentials = [];
        for (let index = 0; index < this._credentials.length; index++) {
            if (!this._credentials[index].useCredentialStore()) {
                if (callback)
                    callback(null, this._credentials[index]);
                return;
            }
            else {
                lookupCredentials.push(this._credentials[index]);
            }
        }
        let firstResult = null;
        async.any(lookupCredentials, (credential, callback) => {
            this.lookupInStores(correlationId, credential, (err, result) => {
                if (err || result == null) {
                    callback(err, false);
                }
                else {
                    firstResult = result;
                    callback(err, true);
                }
            });
        }, (err) => {
            if (callback)
                callback(err, firstResult);
        });
    }
}
exports.CredentialResolver = CredentialResolver;
//# sourceMappingURL=CredentialResolver.js.map