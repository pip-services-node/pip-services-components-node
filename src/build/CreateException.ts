/** @module build */
import { InternalException } from 'pip-services-commons-node';

/**
 * The exception that is thrown, when a component cannot be created by the factory.
 * 
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.internalexception.html InternalException]] (in the PipServices "Commons" package)
 * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.applicationexception.html ApplicationException]] (in the PipServices "Commons" package)
 */
export class CreateException extends InternalException {

    /**
     * @param correlationId         (optional) transaction id to trace execution through call chain..
     * @param messageOrLocator      message to add to the exception, or the locator of the component 
     *                              that was passed to the factory for component creation.
     * 
     * @see [[IFactory.create]]
     */
	public constructor(correlationId: string = null, messageOrLocator: any) {
		super(
            correlationId, 
            "CANNOT_CREATE", 
            typeof(messageOrLocator) == 'string' ? messageOrLocator
                : "Requested component " + messageOrLocator + " cannot be created"
        );

        if (typeof(messageOrLocator) != 'string' && messageOrLocator != null)
		    this.withDetails("locator", messageOrLocator);
	}
    
}
