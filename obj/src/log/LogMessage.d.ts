/** @module log */
import { ErrorDescription } from 'pip-services-commons-node';
export declare class LogMessage {
    time: Date;
    source: string;
    level: string;
    correlation_id: string;
    error: ErrorDescription;
    message: string;
}
