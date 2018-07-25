/** @module auth */
import { ConfigParams } from 'pip-services-commons-node';
import { StringValueMap } from 'pip-services-commons-node';

/**
 * Used for storing various credentials, such as passwords, logins, application keys, and secrets. 
 * This information is usually linked with connection parameters (see [[ConnectionParams]] for more info). 
 * Connection parameters and authentication parameters are separated, due to the fact that credentials need to 
 * be saved as secrects with added security and protection. 
 * 
 * If a service needs to authenticate itself on a certain connection, then the username, password, 
 * and other parameters can be set using a CredentialParams object. Relevant helper classes 
 * (like [[CredentialResolver]]) can be used to acquiring these parameters and discover objects 
 * or components that store and retrieve credential parameters (credential stores - see [[ICredentialStore]]). 
 * 
 * @see [[ConnectionParams]]
 * @see [[CredentialResolver]]
 * @see [[ICredentialStore]]
 */
export class CredentialParams extends ConfigParams {

    /**
	 * Creates a new CredentialParams object from an array of tuples, a parameterized string 
	 * (example: "username=ABC;password=123"), or from an object with credential parameters 
     * stored as properties.
     * 
     * @param values    credential parameters to store in this object. Defaults to null.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html#constructor ConfigParams' constructor]]
     */
    public constructor(values: any = null) {
        super(values);
    }

    /**
     * @returns     whether or not these CredentialParams contain a key that can be
     *              used in a credential store ("store_key" is not null?).
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public useCredentialStore(): boolean {
        return super.getAsNullableString("store_key") != null;
    }

    /**
     * @returns     the key to use for getting credentials from a credential store.
     * 
     * @see [[useCredentialStore]]
     */
    public getStoreKey(): string {
        return super.getAsNullableString("store_key");
    }

    /**
     * @param value     the key to use for getting credentials from a credential store.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public setStoreKey(value: string) {
        super.put("store_key", value);
    }

    /**
     * @returns     the "username" (or "user") value stored in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public getUsername(): string {
        return super.getAsNullableString("username") || super.getAsNullableString("user");
    }

    /**
     * @param value     the username to store in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public setUsername(value: string) {
        super.put("username", value);
    }

    /**
     * @returns     the "password" (or "pass") value stored in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public getPassword(): string {
        return super.getAsNullableString("password") || super.getAsNullableString("pass");
    }

    /**
     * @param value     the password to store in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public setPassword(value: string) {
        super.put("password", value);
    }

    /**
     * @returns     the "access_id" (or "client_id") value stored in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public getAccessId(): string {
        return super.getAsNullableString("access_id") || super.getAsNullableString("client_id");
    }

    /**
     * @param value     the access id to store in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public setAccessId(value: string) {
        super.put("access_id", value);
    }

    /**
     * @returns     the "access_key" (or "client_key") value stored in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public getAccessKey(): string {
        return super.getAsNullableString("access_key") || super.getAsNullableString("client_key");
    }

    /**
     * @param value     the access key to store in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     */
    public setAccessKey(value: string) {
        super.put("access_key", value);
    }

    /**
	 * Static method that creates a CredentialParams object from a parameterized string.
	 * 
	 * @param line 		credential parameters in the form of a parameterized string. 
	 * 					Example: "Key1=123;Key2=ABC;Key3=2016-09-16T00:00:00.00Z"
	 * @returns			generated CredentialParams.
	 * 
	 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.stringvaluemap.html#fromstring StringValueMap.fromString]]
	 */
    public static fromString(line: string): CredentialParams {
        let map = StringValueMap.fromString(line);
        return new CredentialParams(map);
    }

    /**
	 * Static method that converts a ConfigParams object's "credential(s)" section into 
     * a list of CredentialParams.
	 * 
	 * @param config 	ConfigParams with a section named "credential(s)".
	 * @returns			generated list of CredentialParams.
	 * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html#getsection ConfigParams.getSection]]
	 */
    public static manyFromConfig(config: ConfigParams): CredentialParams[] {
        let result: CredentialParams[] = [];

        let credentials: ConfigParams = config.getSection("credentials");

        if (credentials.length() > 0) {
            for (let section in credentials.getSectionNames()) {
                let credential: ConfigParams = credentials.getSection(section);
                result.push(new CredentialParams(credential));
            }
        } else {
            let credential: ConfigParams = config.getSection("credential");
            if (credential.length() > 0) 
                result.push(new CredentialParams(credential));
        }

        return result;
    }

    /**
	 * Static method that converts a ConfigParams object into a list of CredentialParams 
     * (using [[manyFromConfig]]) and returns the first one in the list.
	 * 
	 * @param config 	ConfigParams to convert into a credential parameters object.
	 * @returns			generated CredentialParams.
	 * 
	 * @see [[manyFromConfig]]
	 */
    public static fromConfig(config: ConfigParams): CredentialParams {
        let credentials: CredentialParams[] = this.manyFromConfig(config);
        return credentials.length > 0 ? credentials[0] : null;
    }
}