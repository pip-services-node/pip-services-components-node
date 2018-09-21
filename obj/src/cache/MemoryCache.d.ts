/** @module cache */
import { IReconfigurable } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ICache } from './ICache';
/**
 * Local in-memory cache that can be used for non-scalable deployments or testing.
 *
 * __Configuration parameters__:
 * Parameters to pass to the [[configure]] method for component configuration:
 *
 * - "timeout" - cache entry's expiration timeout (deault is 60000);
 * - "max_size" - the cache's maximum size (deault is 1000).
 *
 * @see [[ICache]]
 *
 * ### Example ###
 *
 * Storing data in a MemoryCache object:
 *
 *     public MyMethod() {
 *         let cache = new MemoryCache();
 *         ...
 *
 *         cache.store("correlationId", "Key", 1, 1, (err)=>{callback();});
 *         ...
 *     }
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
     * Configures this object using the provided configuration parameters.
     *
     * __Configuration parameters__:
     * - "timeout" - cache entry's expiration timeout (deault is 60000);
     * - "max_size" - the cache's maximum size (deault is 1000).
     *
     * @param config the component's configuration parameters.
     * @throws  MicroserviceError when component is in illegal state
     *          or configuration validation fails.
     *
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/classes/config.configparams.html ConfigParams]] (in the PipServices "Commons" package)
     * @see [[https://rawgit.com/pip-services-node/pip-services-commons-node/master/doc/api/interfaces/config.iconfigurable.html IConfigurable]] (in the PipServices "Commons" package)
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
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               unique key to locate the value by in the cache.
     * @param callback          callback function that will be called with an error or the retrieved value.
     *                          Returns <b>null</b> if the value was not found.
     */
    retrieve(correlationId: string, key: string, callback: (err: any, value: any) => void): void;
    /**
     * Stores a value, identified by its unique key, in the cache.
     * Cache entry's expiration timeout is configured in the component's options.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               unique key to locate the value by in the cache.
     * @param value             the value to store.
     * @param timeout           expiration timeout for the cache entry.
     * @param callback          callback function that will be called with an error or the stored value.
     */
    store(correlationId: string, key: string, value: any, timeout: number, callback: (err: any, value: any) => void): void;
    /**
     * Removes a value from the cache using its key.
     *
     * @param correlationId     (optional) transaction id to trace execution through call chain.
     * @param key               unique key to locate the value by in the cache.
     * @param callback          callback function that will be called with an error or success.
     */
    remove(correlationId: string, key: string, callback: (err: any) => void): void;
}
