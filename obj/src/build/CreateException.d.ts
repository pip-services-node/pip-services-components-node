/** @module build */
import { InternalException } from 'pip-services-commons-node';
/**
 * Error raised when factory is not able to create requested component.
 *
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.internalexception.html InternalException]] (in the PipServices "Commons" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.applicationexception.html ApplicationException]] (in the PipServices "Commons" package)
 */
export declare class CreateException extends InternalException {
    /**
     * Creates an error instance and assigns its values.
     *
     * @param correlation_id    (optional) a unique transaction id to trace execution through call chain.
     * @param messageOrLocator  human-readable error or locator of the component that cannot be created.
     */
    constructor(correlationId: string, messageOrLocator: any);
}
