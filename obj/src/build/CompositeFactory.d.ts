import { IFactory } from './IFactory';
/**
 * Class that can add and/or remove various Factory (classes that implement [[IFactory]]) to its list
 * of factories. Using this class, multiple factories can be collected into one object for ease of use.
 * Added factories are called via their unique locators.
 *
 * @see [[IFactory]]
 */
export declare class CompositeFactory implements IFactory {
    private _factories;
    /**
     * @param factories 	list of factories to add to this CompositeFactory.
     */
    constructor(...factories: IFactory[]);
    /**
     * Adds a factory to this CompositeFactory.
     *
     * @param factory 	the factory to add. Cannot be null.
     *
     * @throws an Error if factory is null.
     */
    add(factory: IFactory): void;
    /**
     * Removes a factory from this CompositeFactory.
     *
     * @param factory 	the factory to remove.
     */
    remove(factory: IFactory): void;
    /**
     * Checks if the factory contains the given locator.
     *
     * @param locator 	the locator to search for in this factory. Cannot be null.
     * @returns			the locator that was found or null otherwise.
     *
     * @throws an Error if the locator is null.
     */
    canCreate(locator: any): any;
    /**
     * Creates an object using the given locator.
     *
     * @param locator 	the locator of the factory that needs to be called. Cannot be null.
     * @returns the object that was created by the factory with the given locator.
     *
     * @throws a CreateException if it fails to create an object using the given locator,
     * 			or an Error if the locator is null.
     */
    create(locator: any): any;
}
