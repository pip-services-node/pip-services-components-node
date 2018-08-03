/** @module log */
import { ErrorDescription } from 'pip-services-commons-node';

/**
 * Can be used to serialize log messages, which allows for cross-service and 
 * cross-language logging over REST interfaces.
 */
export class LogMessage {	
	/** The message's timestamp. */
	public time: Date;
	/** The source (context) of the logger that created this message. */
	public source: string;
	/** This message's log level. */
	public level: string;
	/** Unique business transaction id to trace calls across components. */
	public correlation_id: string;
	/** 
	 * The 
	 * [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.errordescription.html ErrorDescription]] 
	 * of the 
	 * [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.applicationexception.html ApplicationException]] 
	 * that is to be included with this message. 
	 */
	public error: ErrorDescription;
	/** The message's main message text. */
	public message: string;
}