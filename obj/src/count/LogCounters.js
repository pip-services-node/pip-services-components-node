"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const CachedCounters_1 = require("./CachedCounters");
const CompositeLogger_1 = require("../log/CompositeLogger");
//TODO: return to after finishing the "log" package.
/**
 * Helper class for working with [[Counter Counters]] and logging them.
 *
 * @see [[Counter]]
 * @see [[CachedCounters]]
 * @see [[CompositeLogger]]
 */
class LogCounters extends CachedCounters_1.CachedCounters {
    constructor() {
        super(...arguments);
        this._logger = new CompositeLogger_1.CompositeLogger();
    }
    /**
     * Creates a new LogCounters object, which can be used for logging CachedCounters.
     */
    LogCounters() { }
    /**
     * Sets this object's [[CompositeLogger logger's]] references using
     * [[CompositeLogger.setReferences]].
     *
     * @param references    the references to set in the logger.
     *
     * @see [[CompositeLogger]]
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/refer.ireferences.html IReferences]] (in the PipServices "Commons" package.)
     */
    setReferences(references) {
        this._logger.setReferences(references);
    }
    counterToString(counter) {
        var result = "Counter " + counter.name + " { ";
        result += "\"type\": " + counter.type;
        if (counter.last != null)
            result += ", \"last\": " + pip_services_commons_node_1.StringConverter.toString(counter.last);
        if (counter.count != null)
            result += ", \"count\": " + pip_services_commons_node_1.StringConverter.toString(counter.count);
        if (counter.min != null)
            result += ", \"min\": " + pip_services_commons_node_1.StringConverter.toString(counter.min);
        if (counter.max != null)
            result += ", \"max\": " + pip_services_commons_node_1.StringConverter.toString(counter.max);
        if (counter.average != null)
            result += ", \"avg\": " + pip_services_commons_node_1.StringConverter.toString(counter.average);
        if (counter.time != null)
            result += ", \"time\": " + pip_services_commons_node_1.StringConverter.toString(counter.time);
        result += " }";
        return result;
    }
    //TODO: are the counters be "logged"?
    /**
     * Sorts the passed counters and passes them to the logger's
     * [[CompositeLogger.info info]] method.
     *
     * @param counters      the counters to log.
     *
     * @see [[CompositeLogger.info]]
     */
    save(counters) {
        if (this._logger == null || counters == null)
            return;
        if (counters.length == 0)
            return;
        counters.sort((c1, c2) => {
            if (c1.name < c2.name)
                return -1;
            if (c1.name > c2.name)
                return 1;
            return 0;
        });
        for (var i = 0; i < counters.length; i++) {
            this._logger.info(null, this.counterToString(counters[i]));
        }
    }
}
exports.LogCounters = LogCounters;
//# sourceMappingURL=LogCounters.js.map