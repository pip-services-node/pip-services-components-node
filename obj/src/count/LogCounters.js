"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const CachedCounters_1 = require("./CachedCounters");
const CompositeLogger_1 = require("../log/CompositeLogger");
class LogCounters extends CachedCounters_1.CachedCounters {
    constructor() {
        super(...arguments);
        this._logger = new CompositeLogger_1.CompositeLogger();
    }
    LogCounters() { }
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