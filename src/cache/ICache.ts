/**
 * Interface that can be used for creating various distributed caches. We can save 
 * an object to cache and retrieve it by its key, using various implementations. 
 */
export interface ICache {

    /**
     * Abstract method that will contain the logic for retrieving key-value pairs
     * from the cache.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to retrieve value by.
     * @param callback          callback function that will be called with an error 
     *                          or the retrieved value.
     */
    retrieve(correlationId: string, key: string,
        callback: (err: any, value: any) => void): void;

    /**
     * Abstract method that will contain the logic for storing key-value pairs
     * in the cache.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to store the value by in the cache.
     * @param value             value to be stored in the cache.
     * @param timeout           timeout for storing the key-value pair in the cache.
     * @param callback          (optional) callback function that will be called with 
     *                          an error, if one is raised.
     */
    store(correlationId: string, key: string, value: any, timeout: number,
        callback?: (err: any) => void): void;

    /**
     * Abstract method that will contain the logic for removing key-value pairs
     * from the cache.
     * 
     * @param correlationId     unique business transaction id to trace calls across components.
     * @param key               key to delete key-value pair by.
     * @param callback          (optional) callback function that will be called with 
     *                          an error, if one is raised.
     */
    remove(correlationId: string, key: string,
        callback?: (err: any) => void);
}
