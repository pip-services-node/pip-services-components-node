"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var ConfigReader_1 = require("./ConfigReader");
exports.ConfigReader = ConfigReader_1.ConfigReader;
var FileConfigReader_1 = require("./FileConfigReader");
exports.FileConfigReader = FileConfigReader_1.FileConfigReader;
var JsonConfigReader_1 = require("./JsonConfigReader");
exports.JsonConfigReader = JsonConfigReader_1.JsonConfigReader;
var MemoryConfigReader_1 = require("./MemoryConfigReader");
exports.MemoryConfigReader = MemoryConfigReader_1.MemoryConfigReader;
var YamlConfigReader_1 = require("./YamlConfigReader");
exports.YamlConfigReader = YamlConfigReader_1.YamlConfigReader;
var DefaultConfigReaderFactory_1 = require("./DefaultConfigReaderFactory");
exports.DefaultConfigReaderFactory = DefaultConfigReaderFactory_1.DefaultConfigReaderFactory;
//# sourceMappingURL=index.js.map