import { IReferenceable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Counter } from './Counter';
import { CachedCounters } from './CachedCounters';
export declare class LogCounters extends CachedCounters implements IReferenceable {
    private readonly _logger;
    LogCounters(): void;
    setReferences(references: IReferences): void;
    private counterToString;
    protected save(counters: Counter[]): void;
}
