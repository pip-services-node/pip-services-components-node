import { ConfigParams } from 'pip-services-commons-node';
/**
 * Contains implementation of connection parameters, using various connection strings, which are
 * stripped of all credentials. Connection parameters and credentials are stored separately,
 * since the latter have special requirements for secure storage (see {@link CredentialParams} for more info).
 *
 * If a service needs to configure a certain connection, then the port, ip address, protocol,
 * and other parameters can be set using a ConnectionParams object. Relevant helper classes
 * (like {@link ConnectionResolver}) can be used to acquiring these parameters and discover objects
 * or components that store and retrieve connection parameters (discovery services - see {@link IDiscovery}).
 *
 * @see CredentialParams
 * @see ConnectionResolver
 * @see IDiscovery
 */
export declare class ConnectionParams extends ConfigParams {
    /**
     * Creates a new ConnectionParams object. Calls the constructor of
     * {StringValueMap#StringValueMap}, which it extends by extending ConfigParams.
     *
     * @param values    values to fill these ConnectionParams with. Defaults to null.
     *
     * @see StringValueMap#StringValueMap
     */
    constructor(values?: any);
    /**
     * @returns     whether or not these ConnectionParams contain a key that can be
     *              used in a discovery service for resolving connections
     *              ("discovery_key" is not null?).
     */
    useDiscovery(): boolean;
    /**
     * @returns     the key to use for connection resolving in a discovery service.
     *
     * @see #useDiscovery
     */
    getDiscoveryKey(): string;
    /**
     * @param value     the key to use when resolving connections in a discovery service.
     */
    setDiscoveryKey(value: string): void;
    /**
     * @param defaultValue  (optional) value to return if no protocol is set.
     *                      Defaults to null if omitted.
     * @returns             the protocol set in these ConnectionParams or defaultValue,
     *                      if no protocol was set.
     */
    getProtocol(defaultValue?: string): string;
    /**
     * @param value     protocol to use in these ConnectionParams.
     */
    setProtocol(value: string): void;
    /**
     * @returns     the host (or the ip, if no host was found) that is set in
     *              these ConnectionParams.
     */
    getHost(): string;
    /**
     * Sets the host's name or ip address that will be used in these ConnectionParams.
     *
     * @param value     host's name or ip address.
     */
    setHost(value: string): void;
    /**
     * @returns the port set in these ConnectionParams.
     */
    getPort(): number;
    /**
     * Sets the host's port for these ConnectionParams.
     *
     * @param value     which port to connect to on the host.
     *
     * @see #getHost
     */
    setPort(value: number): void;
    /**
     * @returns the target URI of these ConnectionParams.
     */
    getUri(): string;
    /**
     * Sets the target URI of these ConnectionParams.
     *
     * @param value     target URI.
     */
    setUri(value: string): void;
    /**
     * Static method for converting a parameterized string into a  ConnectionParams
     * object.
     *
     * Example string: "protocol=http;host=0.0.0.0;port=8080"
     *
     * @param line  parameterized string that contains the connection's parameters.
     * @returns     ConnectionParams that were generated.
     *
     * @see StringValueMap#fromString
     */
    static fromString(line: string): ConnectionParams;
    /**
     * Static method for creating a list of ConnectionParams from a ConfigParams object.
     * Parses the values found in the section named "connection(s)" into a ConnectionParams
     * object and adds it to the list.
     *
     * If the section name "connections" is used, then each subsection will be treated as a
     * separate connection, for which a separate ConnectionParams object will be created and
     * added to the list.
     *
     * @param config    ConfigParams that are to be transformed into a list of ConnectionParams.
     * @returns         the list of ConnectionParams that were successfully generated.
     *
     * @see ConfigParams
     */
    static manyFromConfig(config: ConfigParams): ConnectionParams[];
    /**
     * Static method that converts ConfigParams into ConnectionParams. Uses static method
     * {@link #manyFromConfig}.
     *
     * @param config    ConfigParams to convert into a ConnectionParams object.
     * @returns         generated ConnectionParams (if successful) or null otherwise.
     *
     * @see #manyFromConfig
     * @see ConfigParams
     */
    static fromConfig(config: ConfigParams): ConnectionParams;
}
