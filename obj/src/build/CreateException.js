"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
/**
 * The exception that is thrown, when a component cannot be created by the factory.
 *
 * @see InternalException
 * @see ApplicationException
 */
class CreateException extends pip_services_commons_node_1.InternalException {
    /**
     * @param correlationId         unique business transaction id to trace calls across components.
     * @param messageOrLocator      message to add to the exception, or the locator of the component
     *                              that was passed to the factory for component creation.
     *
     * @see IFactory#create
     */
    constructor(correlationId = null, messageOrLocator) {
        super(correlationId, "CANNOT_CREATE", typeof (messageOrLocator) == 'string' ? messageOrLocator
            : "Requested component " + messageOrLocator + " cannot be created");
        if (typeof (messageOrLocator) != 'string' && messageOrLocator != null)
            this.withDetails("locator", messageOrLocator);
    }
}
exports.CreateException = CreateException;
//# sourceMappingURL=CreateException.js.map