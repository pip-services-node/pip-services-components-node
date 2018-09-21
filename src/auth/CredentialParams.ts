/** @module auth */
import { ConfigParams } from 'pip-services-commons-node';
import { StringValueMap } from 'pip-services-commons-node';

/**
 * Contains credentials to authenticate against external services.
 * They are used together with connection parameters, but usually stored
 * in a separate store, protected from unauthorized access.
 * 
 * ### Configuration parameters ###
 * - store_key:     key to retrieve parameters from credential store
 * - username:      user name
 * - user:          alternative to username
 * - password:      user password
 * - pass:          alternative to password
 * - access_id:     application access id
 * - client_id:     alternative to access_id
 * - access_key:    application secret key
 * - client_key:    alternative to access_key
 * 
 * In addition to standard parameters Credentials may contain any number of custom parameters
 * 
 * @see [[ConfigParams]]
 * @see [[ConnectionParams]]
 * @see [[CredentialResolver]]
 * @see [[ICredentialStore]]
 * 
 * ### Example ###
 * 
 * let credentials = CredentialParams.fromTuples(
 *  "user", "jdoe",
 *  "pass", "pass123",
 *  "pin", "321"
 * );
 * 
 * let username = credentials.getUsername();    // Result: "jdoe"
 * let password = credentials.getPassword();    // Result: "pass123"
 * let pin = credentials.getAsNullableString(); // Result: 321   
 */
export class CredentialParams extends ConfigParams {

    /**
	 * Creates a new ConfigParams and fills it with values.
     * 
	 * @param values 	(optional) an object to be converted into key-value pairs to initialize these credentials.
     */
    public constructor(values: any = null) {
        super(values);
    }

    /**
     * Checks if these credential parameters shall be retrieved from [[CredentialStore]].
     * It is set by store_key parameter.
     * 
     * @returns     true if credentials shall be
     * 
     * @see [[getStoreKey]]
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
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public setStoreKey(value: string) {
        super.put("store_key", value);
    }

    /**
     * @returns     the "username" (or "user") value stored in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public getUsername(): string {
        return super.getAsNullableString("username") || super.getAsNullableString("user");
    }

    /**
     * @param value     the username to store in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public setUsername(value: string) {
        super.put("username", value);
    }

    /**
     * @returns     the "password" (or "pass") value stored in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public getPassword(): string {
        return super.getAsNullableString("password") || super.getAsNullableString("pass");
    }

    /**
     * @param value     the password to store in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public setPassword(value: string) {
        super.put("password", value);
    }

    /**
     * @returns     the "access_id" (or "client_id") value stored in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public getAccessId(): string {
        return super.getAsNullableString("access_id") || super.getAsNullableString("client_id");
    }

    /**
     * @param value     the access id to store in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public setAccessId(value: string) {
        super.put("access_id", value);
    }

    /**
     * @returns     the "access_key" (or "client_key") value stored in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    public getAccessKey(): string {
        return super.getAsNullableString("access_key") || super.getAsNullableString("client_key");
    }

    /**
     * @param value     the access key to store in these CredentialParams.
     * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
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
	 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.stringvaluemap.html#fromstring StringValueMap.fromString]] (in the PipService's "Commons" package)
	 */
    public static fromString(line: string): CredentialParams {
        let map = StringValueMap.fromString(line);
        return new CredentialParams(map);
    }

    /**
	 * Static method that converts a ConfigParams' "credential(s)" section into 
     * a list of CredentialParams.
     * 
     * If the section name "credentials" is used, then each subsection will be treated as a 
     * separate credential, for which a separate CredentialParams object will be created and
     * added to the list.
	 * 
	 * @param config 	ConfigParams, containing a section named "credential(s)".
	 * @returns			the generated list of CredentialParams.
	 * 
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipService's "Commons" package)
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
	 * Static method that retrieves the first CredentialParams found in the given ConfigParams.
     * The ConfigParams' "credential(s)" section will be converted into a CredentialParams object.
	 * 
	 * @param config 	ConfigParams, containing a section named "credential(s)".
	 * @returns			the generated CredentialParams object.
	 * 
	 * @see [[manyFromConfig]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
	 */
    public static fromConfig(config: ConfigParams): CredentialParams {
        let credentials: CredentialParams[] = this.manyFromConfig(config);
        return credentials.length > 0 ? credentials[0] : null;
    }
}