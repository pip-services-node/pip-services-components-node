"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timing {
    constructor(counter = null, callback = null) {
        this._counter = counter;
        this._callback = callback;
        this._start = new Date().getTime();
    }
    endTiming() {
        if (this._callback != null) {
            let elapsed = new Date().getTime() - this._start;
            this._callback.endTiming(this._counter, elapsed);
        }
    }
}
exports.Timing = Timing;
//# sourceMappingURL=Timing.js.map