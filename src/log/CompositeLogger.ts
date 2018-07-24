/** @module log */
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { ILogger } from './ILogger';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';

export class CompositeLogger extends Logger implements IReferenceable {
	private readonly _loggers: ILogger[] = [];

	public constructor(references: IReferences = null) {
		super();

		if (references)
			this.setReferences(references);
	}

	public setReferences(references: IReferences): void {
		super.setReferences(references);

		let loggers: any[] = references.getOptional<any>(new Descriptor(null, "logger", null, null, null));
        for (var i = 0; i < loggers.length; i++) {
            let logger: ILogger = loggers[i];

			// Todo: This doesn't work in TS. Redo...
            if (logger != this as ILogger)
                this._loggers.push(logger);
        }
	}

	protected write(level: LogLevel, correlationId: string, error: Error, message: string): void {
		for (let index = 0; index < this._loggers.length; index++) 
			this._loggers[index].log(level, correlationId, error, message);
	}
}