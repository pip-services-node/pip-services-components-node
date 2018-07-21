"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateException_1 = require("./CreateException");
class Registration {
}
/**
 * Base factory class that can be extended for creating more specific factories. Usually, all that needs
 * to be added to a class that extends Factory is:
 * - a set of locators (PipServices uses {@link Descriptor Descriptors}) - one for each object type that needs to be included in this factory.
 * - a constructor (in which the object types are registered using the {@link #registerAsType} method).
 *
 * #### Example Descriptor:
 *     public static readonly MyClassDescriptor: Descriptor = new Descriptor("my-services", "factory", "my-class", "default", "1.0");
 *
 * #### Example constructor:
 *     public constructor() {
 *         super();
 *         this.registerAsType(MyFactory.MyClassDescriptor, MyClass);
 *     }
 *
 * @see Descriptor
 * @see IFactory
 */
class Factory {
    constructor() {
        this._registrations = [];
    }
    /**
     * Registers a factory.
     *
     * Example factory:
     *
     *     (locator) => { return new myClass(); }
     *
     * @param locator 		the locator that is used to identify the factory. Cannot be null.
     * @param factory 		the factory to add. Cannot be null.
     *
     * @throws Error, when locator or factory parameters are null.
     */
    register(locator, factory) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        if (factory == null)
            throw new Error("Factory cannot be null");
        this._registrations.push({
            locator: locator,
            factory: factory
        });
    }
    /**
     * Registers a factory that can create instance of 'objectFactory' classes.
     *
     * @param locator 			the locator that is used to identify the object factory. Cannot be null.
     * @param objectFactory 	the object type that can be created by this factory. Cannot be null.
     *
     * @throws Error, when locator or factory parameters are null.
     */
    registerAsType(locator, objectFactory) {
        if (locator == null)
            throw new Error("Locator cannot be null");
        if (objectFactory == null)
            throw new Error("Factory cannot be null");
        this._registrations.push({
            locator: locator,
            factory: (locator) => { return new objectFactory(); }
        });
    }
    /**
     * Checks if the factory contains the given locator.
     *
     * @param locator 	the locator to search for in this factory.
     * @returns			the locator that was found or null otherwise.
     */
    canCreate(locator) {
        for (let index = 0; index < this._registrations.length; index++) {
            let registration = this._registrations[index];
            let thisLocator = registration.locator;
            if (thisLocator == locator || (thisLocator.equals && thisLocator.equals(locator)))
                return thisLocator;
        }
        return null;
    }
    /**
     * Creates an object using the given locator.
     *
     * @param locator 	the locator of the factory that needs to be called.
     * @returns the object that was created by the factory with the given locator.
     *
     * @throws a CreateException, if it fails to create an object using the given locator.
     */
    create(locator) {
        for (let index = 0; index < this._registrations.length; index++) {
            let registration = this._registrations[index];
            let thisLocator = registration.locator;
            if (thisLocator == locator || (thisLocator.equals && thisLocator.equals(locator)))
                try {
                    return registration.factory(locator);
                }
                catch (ex) {
                    if (ex instanceof CreateException_1.CreateException)
                        throw ex;
                    throw new CreateException_1.CreateException(null, "Failed to create object for " + locator).withCause(ex);
                }
        }
        return null;
    }
}
exports.Factory = Factory;
//# sourceMappingURL=Factory.js.map