/**
 * @module config
 * @preferred
 * Contains implementation of the config design pattern. Configurable interface contains
 * one and only method "configure", which takes ConfigParams as a parameter (extends
 * StringValueMap class). If any object needs to be configurable, we implement this
 * interface and parse the ConfigParams that the method received.
 *
 * ConfigReader's Parameterize method – allows us to take a standard configuration, and
 * using a set of current parameters we can parameterize it (in particular, used to parameterize
 * using environment variables. When we create the configuration of a container, we can use
 * environment variables to tailor it to the system, dynamically add addresses, ports, etc)
 */
export { ConfigReader } from './ConfigReader';
export { FileConfigReader } from './FileConfigReader';
export { IConfigReader } from './IConfigReader';
export { JsonConfigReader } from './JsonConfigReader';
export { MemoryConfigReader } from './MemoryConfigReader';
export { YamlConfigReader } from './YamlConfigReader';
export { DefaultConfigReaderFactory } from './DefaultConfigReaderFactory';
