/**
 * Simplifies working with key-value pairs in/from the cache.
 */
export declare class CacheEntry {
    private _key;
    private _value;
    private _expiration;
    /**
     * @param key       unique key to locate the value by in the cache.
     * @param value     value to be stored in (or retrieved from) the cache.
     * @param timeout   expiration timeout for this cache entry.
     */
    constructor(key: string, value: any, timeout: number);
    /**
     * @returns the unique key by which this cache entry's value can be
     *          located in the cache.
     */
    getKey(): string;
    /**
     * @returns the value of this cache entry.
     */
    getValue(): any;
    /**
     * @returns the expiration timeout for this cache entry.
     */
    getExpiration(): number;
    /**
     * @param value     the value to be stored in (or retrieved from) the cache by this cache entry's key.
     * @param timeout   expiration timeout for this cache entry.
     */
    setValue(value: any, timeout: number): void;
    /**
     * @returns whether or not this cache entry's timeout has expired.
     */
    isExpired(): boolean;
}
