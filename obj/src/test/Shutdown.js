"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @module test */
/** @hidden */
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class Shutdown {
    constructor() {
        this._mode = 'exception';
        this._minTimeout = 300000;
        this._maxTimeout = 900000;
    }
    configure(config) {
        this._mode = config.getAsStringWithDefault('mode', this._mode);
        this._minTimeout = config.getAsIntegerWithDefault('min_timeout', this._minTimeout);
        this._maxTimeout = config.getAsIntegerWithDefault('max_timeout', this._maxTimeout);
    }
    isOpen() {
        return this._interval != null;
    }
    open(correlationId, callback) {
        if (this._interval != null)
            clearInterval(this._interval);
        let timeout = pip_services_commons_node_1.RandomInteger.nextInteger(this._minTimeout, this._maxTimeout);
        this._interval = setInterval(() => {
            this.shutdown();
        }, timeout);
        if (callback)
            callback(null);
    }
    close(correlationId, callback) {
        if (this._interval != null) {
            clearInterval(this._interval);
            this._interval = null;
        }
        if (callback)
            callback(null);
    }
    shutdown() {
        if (this._mode == 'null' || this._mode == 'nullpointer') {
            let obj = null;
            obj.crash = 123;
        }
        else if (this._mode == 'zero' || this._mode == 'dividebyzero') {
            let crash = 0 / 100;
        }
        else if (this._mode == 'exit' || this._mode == 'processexit') {
            process.exit(1);
        }
        else {
            let err = new pip_services_commons_node_2.ApplicationException('test', null, 'CRASH', 'Crash test exception');
            throw err;
        }
    }
}
exports.Shutdown = Shutdown;
//# sourceMappingURL=Shutdown.js.map