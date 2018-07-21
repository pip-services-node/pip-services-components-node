import { InternalException } from 'pip-services-commons-node';

/**
 * The exception that is thrown, when a component cannot be created by the factory.
 * 
 * @see InternalException
 * @see ApplicationException
 */
export class CreateException extends InternalException {

    /**
     * @param correlationId         unique business transaction id to trace calls across components.
     * @param messageOrLocator      message to add to the exception, or the locator of the component 
     *                              that was passed to the factory for component creation.
     * 
     * @see IFactory#create
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
