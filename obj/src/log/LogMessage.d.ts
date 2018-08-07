/** @module log */
import { ErrorDescription } from 'pip-services-commons-node';
/**
 * Can be used to serialize log messages, which allows for cross-service and
 * cross-language logging over REST interfaces.
 */
export declare class LogMessage {
    /** The message's timestamp. */
    time: Date;
    /** The source (context) of the logger that created this message. */
    source: string;
    /** This message's log level. */
    level: string;
    /** Unique business transaction id to trace calls across components. */
    correlation_id: string;
    /**
     * The
     * [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.errordescription.html ErrorDescription]]
     * of the
     * [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/errors.applicationexception.html ApplicationException]]
     * that is to be included with this message.
     */
    error: ErrorDescription;
    /** The message's main message text. */
    message: string;
}
