import { ConfigParams } from 'pip-services-commons-node';
/**
 * Used for storing various credentials, such as passwords, logins, application keys, and secrets.
 * This information is usually linked with connection parameters (see {@link ConnectionParams} for more info).
 * Connection parameters and authentication parameters are separated, due to the fact that credentials need to
 * be saved as secrects with added security and protection.
 *
 * If a service needs to authenticate itself on a certain connection, then the username, password,
 * and other parameters can be set using a CredentialParams object. Relevant helper classes
 * (like {@link CredentialResolver}) can be used to acquiring these parameters and discover objects
 * or components that store and retrieve credential parameters (credential stores - see {@link ICredentialStore}).
 *
 * @see ConnectionParams
 * @see CredentialResolver
 * @see ICredentialStore
 */
export declare class CredentialParams extends ConfigParams {
    /**
     * Creates a new CredentialParams object from an array of tuples, a parameterized string
     * (example: "username=ABC;password=123"), or from an object with credential parameters
     * stored as properties.
     *
     * @param values    credential parameters to store in this object. Defaults to null.
     *
     * @see ConfigParams#ConfigParams
     */
    constructor(values?: any);
    /**
     * @returns     whether or not these CredentialParams contain a key that can be
     *              used in a credential store ("store_key" is not null?).
     *
     * @see ConfigParams
     */
    useCredentialStore(): boolean;
    /**
     * @returns     the key to use for getting credentials from a credential store.
     *
     * @see #useCredentialStore
     */
    getStoreKey(): string;
    /**
     * @param value     the key to use for getting credentials from a credential store.
     *
     * @see ConfigParams
     */
    setStoreKey(value: string): void;
    /**
     * @returns     the "username" (or "user") value stored in these CredentialParams.
     *
     * @see ConfigParams
     */
    getUsername(): string;
    /**
     * @param value     the username to store in these CredentialParams.
     *
     * @see ConfigParams
     */
    setUsername(value: string): void;
    /**
     * @returns     the "password" (or "pass") value stored in these CredentialParams.
     *
     * @see ConfigParams
     */
    getPassword(): string;
    /**
     * @param value     the password to store in these CredentialParams.
     *
     * @see ConfigParams
     */
    setPassword(value: string): void;
    /**
     * @returns     the "access_id" (or "client_id") value stored in these CredentialParams.
     *
     * @see ConfigParams
     */
    getAccessId(): string;
    /**
     * @param value     the access id to store in these CredentialParams.
     *
     * @see ConfigParams
     */
    setAccessId(value: string): void;
    /**
     * @returns     the "access_key" (or "client_key") value stored in these CredentialParams.
     *
     * @see ConfigParams
     */
    getAccessKey(): string;
    /**
     * @param value     the access key to store in these CredentialParams.
     *
     * @see ConfigParams
     */
    setAccessKey(value: string): void;
    /**
     * Static method that creates a CredentialParams object from a parameterized string.
     *
     * @param line 		credential parameters in the form of a parameterized string.
     * 					Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"
     * @returns			generated CredentialParams.
     *
     * @see StringValueMap#fromString
     */
    static fromString(line: string): CredentialParams;
    /**
     * Static method that converts a ConfigParams object's "credential(s)" section into
     * a list of CredentialParams.
     *
     * @param config 	ConfigParams with a section named "credential(s)".
     * @returns			generated list of CredentialParams.
     *
     * @see ConfigParams
     * @see ConfigParams#getSection
     */
    static manyFromConfig(config: ConfigParams): CredentialParams[];
    /**
     * Static method that converts a ConfigParams object into a list of CredentialParams
     * (using {@link #manyFromConfig}) and returns the first one in the list.
     *
     * @param config 	ConfigParams to convert into a credential parameters object.
     * @returns			generated CredentialParams.
     *
     * @see #manyFromConfig
     */
    static fromConfig(config: ConfigParams): CredentialParams;
}
