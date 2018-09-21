"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module connect */
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
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
class ConnectionParams extends pip_services_commons_node_1.ConfigParams {
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
    constructor(values = null) {
        super(values);
    }
    /**
     * @returns     whether or not these ConnectionParams contain a key that can be
     *              used in a discovery service for resolving connections
     *              ("discovery_key" is not null?).
     */
    useDiscovery() {
        return super.getAsNullableString("discovery_key") != null;
    }
    /**
     * @returns     the key to use for connection resolving in a discovery service.
     *
     * @see [[useDiscovery]]
     */
    getDiscoveryKey() {
        return super.getAsString("discovery_key");
    }
    /**
     * @param value     the key to use when resolving connections in a discovery service.
     */
    setDiscoveryKey(value) {
        return super.put("discovery_key", value);
    }
    /**
     * @param defaultValue  (optional) value to return if no protocol is set.
     *                      Defaults to null if omitted.
     * @returns             the protocol set in these ConnectionParams or defaultValue,
     *                      if no protocol was set.
     */
    getProtocol(defaultValue = null) {
        return super.getAsStringWithDefault("protocol", defaultValue);
    }
    /**
     * @param value     protocol to use in these ConnectionParams.
     */
    setProtocol(value) {
        return super.put("protocol", value);
    }
    /**
     * @returns     the "host" or the "ip" (if no host was found) that is set in
     *              these ConnectionParams.
     */
    getHost() {
        let host = super.getAsNullableString("host");
        host = host || super.getAsNullableString("ip");
        return host;
    }
    /**
     * Sets the host's name or ip address that will be used in these ConnectionParams.
     *
     * @param value     host's name or ip address.
     */
    setHost(value) {
        return super.put("host", value);
    }
    /**
     * @returns the port set in these ConnectionParams.
     */
    getPort() {
        return super.getAsInteger("port");
    }
    /**
     * Sets the host's port for these ConnectionParams.
     *
     * @param value     which port to connect to on the host.
     *
     * @see [[getHost]]
     */
    setPort(value) {
        return super.put("port", value);
    }
    /**
     * @returns the target URI of these ConnectionParams.
     */
    getUri() {
        return super.getAsString("uri");
    }
    /**
     * Sets the target URI of these ConnectionParams.
     *
     * @param value     target URI.
     */
    setUri(value) {
        return super.put("uri", value);
    }
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
    static fromString(line) {
        let map = pip_services_commons_node_2.StringValueMap.fromString(line);
        return new ConnectionParams(map);
    }
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
    static manyFromConfig(config) {
        let result = [];
        let connections = config.getSection("connections");
        if (connections.length() > 0) {
            let connectionSections = connections.getSectionNames();
            for (let index; index < connectionSections.length; index++) {
                let connection = connections.getSection(connectionSections[index]);
                result.push(new ConnectionParams(connection));
            }
        }
        else {
            let connection = config.getSection("connection");
            if (connection.length() > 0)
                result.push(new ConnectionParams(connection));
        }
        return result;
    }
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
    static fromConfig(config) {
        let connections = this.manyFromConfig(config);
        return connections.length > 0 ? connections[0] : null;
    }
}
exports.ConnectionParams = ConnectionParams;
//# sourceMappingURL=ConnectionParams.js.map