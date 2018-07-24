/** @module log */
import { ErrorDescription } from 'pip-services-commons-node';

export class LogMessage {	
	public time: Date;
	public source: string;
	public level: string;
	public correlation_id: string;
	public error: ErrorDescription;
	public message: string;
}