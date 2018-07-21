/**
 * Simplifies working with key-value pairs in/from the cache.
 */
export class CacheEntry {
    private _key: string;
    private _value: any;
    private _expiration: number;

    /**
     * @param key       unique key to locate the value by in the cache.
     * @param value     value to be stored in (or retrieved from) the cache.
     * @param timeout   expiration timeout for this cache entry.
     */
    public constructor(key: string, value: any, timeout: number) {
        this._key = key;
        this._value = value;
        this._expiration = new Date().getTime() + timeout;
    }

    /**
     * @returns the unique key by which this cache entry's value can be 
     *          located in the cache.
     */
    public getKey(): string {
        return this._key;
    }

    /**
     * @returns the value of this cache entry. 
     */
    public getValue(): any {
        return this._value;
    }

    /**
     * @returns the expiration timeout for this cache entry.
     */
    public getExpiration(): number {
        return this._expiration;
    }

    /**
     * @param value     the value to be stored in (or retrieved from) the cache by this cache entry's key.
     * @param timeout   expiration timeout for this cache entry.
     */
    public setValue(value: any, timeout: number): void {
        this._value = value;
        this._expiration = new Date().getTime() + timeout;
    }

    /**
     * @returns whether or not this cache entry's timeout has expired.
     */
    public isExpired(): boolean {
        return this._expiration < new Date().getTime();
    }

}
