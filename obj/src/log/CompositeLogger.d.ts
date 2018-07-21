import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';
export declare class CompositeLogger extends Logger implements IReferenceable {
    private readonly _loggers;
    constructor(references?: IReferences);
    setReferences(references: IReferences): void;
    protected write(level: LogLevel, correlationId: string, error: Error, message: string): void;
}
