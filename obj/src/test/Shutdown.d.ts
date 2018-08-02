import { ConfigParams } from "pip-services-commons-node";
import { IConfigurable } from "pip-services-commons-node";
import { IOpenable } from "pip-services-commons-node";
export declare class Shutdown implements IConfigurable, IOpenable {
    private _interval;
    private _mode;
    private _minTimeout;
    private _maxTimeout;
    constructor();
    configure(config: ConfigParams): void;
    isOpen(): boolean;
    open(correlationId: string, callback: (err: any) => void): void;
    close(correlationId: string, callback: (err: any) => void): void;
    shutdown(): void;
}
