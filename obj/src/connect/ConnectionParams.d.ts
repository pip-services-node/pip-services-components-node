/** @module connect */
import { ConfigParams } from 'pip-services-commons-node';
/**
 * Contains implementation of connection parameters, using various connection strings, which are
 * stripped of all credentials. Connection parameters and credentials are stored separately,
 * since the latter have special requirements for secure storage (see [[CredentialParams]] for more info).
 *
 * If a service needs to configure a certain connection, then the port, ip address, protocol,
 * and other parameters can be set using a ConnectionParams object. Relevant helper classes
 * (like [[ConnectionResolver]]) can be used to acquiring these parameters and discover objects
 * or components that store and retrieve connection parameters (discovery services - see [[IDiscovery]]).
 *
 * ### Possible configuration parameters: ###
 * - "discovery_key" - the key to use for connection resolving in a discovery service;
 * - "protocol" - the connection's protocol;
 * - "host" - the target host;
 * - "port" - the target port;
 * - "uri" - the target URI.
 *
 * @see [[CredentialParams]]
 * @see [[ConnectionResolver]]
 * @see [[IDiscovery]]
 *
 * ### Example ###
 *
 * Example ConnectionParams object usage:
 *
 *     public MyMethod() {
 *         let connection = new ConnectionParams();
 *         connection.setDiscoveryKey("Discovery key");
 *         connection.setProtocol("https");
 *         connection.setHost("localhost");
 *         connection.setPort("8080");
 *         connection.setUri("http://localhost:0");
 *         ...
 *     }
 */
export declare class ConnectionParams extends ConfigParams {
    /**
     * Creates a new ConnectionParams object. Calls
     * [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.stringvaluemap.html#constructor StringValueMap's constructor]],
     * which it extends by extending [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]].
     *
     * @param values    values to fill these ConnectionParams with. Defaults to null.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.stringvaluemap.html#constructor StringValueMap's constructor]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
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
     * @see [[useDiscovery]]
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
     * @returns     the "host" or the "ip" (if no host was found) that is set in
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
     * @see [[getHost]]
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
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/data.stringvaluemap.html#fromstring StringValueMap.fromString]] (in the PipServices "Commons" package)
     */
    static fromString(line: string): ConnectionParams;
    /**
     * Static method that converts a ConfigParams' "connection(s)" section into
     * a list of ConnectionParams.
     *
     * If the section name "connections" is used, then each subsection will be treated as a
     * separate connection, for which a separate ConnectionParams object will be created and
     * added to the list.
     *
     * @param config 	ConfigParams, containing a section named "connection(s)".
     * @returns			the generated list of ConnectionParams.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipService's "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html#getsection ConfigParams.getSection]]
     */
    static manyFromConfig(config: ConfigParams): ConnectionParams[];
    /**
     * Static method that retrieves the first ConnectionParams found in the given ConfigParams.
     * The ConfigParams' "connection(s)" section will be converted into a ConnectionParams object.
     *
     * @param config 	ConfigParams, containing a section named "connection(s)".
     * @returns			the generated ConnectionParams object (or null).
     *
     * @see [[manyFromConfig]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     */
    static fromConfig(config: ConfigParams): ConnectionParams;
}
