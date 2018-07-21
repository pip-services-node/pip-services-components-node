"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const CreateException_1 = require("./CreateException");
/**
 * Class that can add and/or remove various Factory (classes that implement {@link IFactory}) to its list
 * of factories. Using this class, multiple factories can be collected into one object for ease of use.
 * Added factories are called via their unique locators.
 *
 * @see IFactory
 */
class CompositeFactory {
    /**
     * @param factories 	list of factories to add to this CompositeFactory.
     */
    constructor(...factories) {
        this._factories = [];
        if (factories != null)
            this._factories = this._factories.concat(factories);
    }
    /**
     * Adds a factory to this CompositeFactory.
     *
     * @param factory 	the factory to add. Cannot be null.
     *
     * @throws an Error if factory is null.
     */
    add(factory) {
        if (factory == null)
            throw new Error("Factory cannot be null");
        this._factories.push(factory);
    }
    /**
     * Removes a factory from this CompositeFactory.
     *
     * @param factory 	the factory to remove.
     */
    remove(factory) {
        this._factories = _.remove(this._factories, f => f == factory);
    }
    /**
     * Checks if the factory contains the given locator.
     *
     * @param locator 	the locator to search for in this factory. Cannot be null.
     * @returns			the locator that was found or null otherwise.
     *
     * @throws an Error if the locator is null.
     */
    canCreate(locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        // Iterate from the latest factories
        for (let index = this._factories.length - 1; index >= 0; index--) {
            let thisLocator = this._factories[index].canCreate(locator);
            if (thisLocator != null)
                return thisLocator;
        }
        return null;
    }
    /**
     * Creates an object using the given locator.
     *
     * @param locator 	the locator of the factory that needs to be called. Cannot be null.
     * @returns the object that was created by the factory with the given locator.
     *
     * @throws a CreateException if it fails to create an object using the given locator,
     * 			or an Error if the locator is null.
     */
    create(locator) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        // Iterate from the latest factories
        for (let index = this._factories.length - 1; index >= 0; index--) {
            let factory = this._factories[index];
            if (factory.canCreate(locator) != null)
                return factory.create(locator);
        }
        throw new CreateException_1.CreateException(null, locator);
    }
}
exports.CompositeFactory = CompositeFactory;
//# sourceMappingURL=CompositeFactory.js.map