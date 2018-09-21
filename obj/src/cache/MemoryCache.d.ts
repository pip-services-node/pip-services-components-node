/** @module cache */
import { IReconfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ICache } from './ICache';
/**
 * Provides local in-memory cache support.
 *
 * @see [[ICache]]
 */
export declare class MemoryCache implements ICache, IReconfigurable {
    private static readonly _defaultTimeout;
    private static readonly _defaultMaxSize;
    private _cache;
    private _count;
    private _timeout;
    private _maxSize;
    /**
     * Creates a local in-memory cache component.
     */
    constructor();
    /**
     * Sets this object's 'timeout' and 'max_size' to the values that are
     * set in the passed configuration parameters.
     *
     * @param config the component's configuration parameters.
     * @throws  MicroserviceError when component is in illegal state
     *          or configuration validation fails.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" Package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" Package)
     */
    configure(config: ConfigParams): void;
    /**
     * Cleans up cache from obsolete values and shrinks the cache
     * to fit into allowed max size by dropping values that were not
     * accessed for a long time.
     */
    private cleanup;
    /**
     * Retrieves a value from the cache by its unique key.
     * It is recommended to use either string GUIDs (for example: '123456789abc')
     * or unique natural keys prefixed with the functional group (for example:
     * 'pip-services-storage:block-123').
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param key               unique key to locate the value by in the cache.
     * @param callback          callback function that will be called with an error or the retrieved value.
     *                          Returns <b>null</b> if the value was not found.
     */
    retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void;
    /**
     * Stores value identified by unique key in the cache.
     * Cache entry's expiration timeout is configured in the component's options.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param key               unique key to locate the value by in the cache.
     * @param value             value to store.
     * @param callback          callback function that will be called with an error or the stored value.
     */
    store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any, value: any) => void): void;
    /**
     * Removes a value from the cache using its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain..
     * @param key               unique key to locate the value by in the cache.
     * @param callback          callback function that will be called with an error or success.
     */
    remove(correlationId: string, key: string, callback: (err: any) => void): void;
}
