import { ConfigParams } from "pip-services-commons-node";
import { IConfigurable } from "pip-services-commons-node";
import { IOpenable } from "pip-services-commons-node";
/**
 * Random shutdown component that crashes the process
 * using various methods.
 *
 * The component is usually used for testing, but brave developers
 * can try to use it in production to randomly crash microservices.
 * It follows the concept of "Chaos Monkey" popularized by Netflix.
 *
 * ### Configuration parameters ###
 *
 * - mode:          null - crash by NullPointer excepiton, zero - crash by dividing by zero, excetion = crash by unhandled exception, exit - exit the process
 * - min_timeout:   minimum crash timeout in milliseconds (default: 5 mins)
 * - max_timeout:   maximum crash timeout in milliseconds (default: 15 minutes)
 *
 * ### Example ###
 *
 *     let shutdown = new Shutdown();
 *     shutdown.configure(ConfigParams.fromTuples(
 *         "mode": "exception"
 *     ));
 *     shutdown.shutdown();         // Result: Bang!!! the process crashes
 */
export declare class Shutdown implements IConfigurable, IOpenable {
    private _interval;
    private _mode;
    private _minTimeout;
    private _maxTimeout;
    /**
     * Creates a new instance of the shutdown component.
     */
    constructor();
    /**
     * Configures component by passing configuration parameters.
     *
     * @param config    configuration parameters to be set.
     */
    configure(config: ConfigParams): void;
    /**
     * Checks if the component is opened.
     *
     * @returns true if the component has been opened and false otherwise.
     */
    isOpen(): boolean;
    /**
     * Opens the component.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    open(correlationId: string, callback: (err: any) => void): void;
    /**
     * Closes component and frees used resources.
     *
     * @param correlationId 	(optional) transaction id to trace execution through call chain.
     * @param callback 			callback function that receives error or null no errors occured.
     */
    close(correlationId: string, callback: (err: any) => void): void;
    /**
     * Crashes the process using the configured crash mode.
     */
    shutdown(): void;
}
