import { InternalException } from 'pip-services-commons-node';
/**
 * The exception that is thrown, when a component cannot be created by the factory.
 *
 * @see InternalException
 * @see ApplicationException
 */
export declare class CreateException extends InternalException {
    /**
     * @param correlationId         unique business transaction id to trace calls across components.
     * @param messageOrLocator      message to add to the exception, or the locator of the component
     *                              that was passed to the factory for component creation.
     *
     * @see IFactory#create
     */
    constructor(correlationId: string, messageOrLocator: any);
}
