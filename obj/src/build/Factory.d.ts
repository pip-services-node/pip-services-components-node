/** @module build */
import { IFactory } from './IFactory';
/**
 * Base factory class that can be extended for creating more specific factories. Usually, all that needs
 * to be added to a class that extends Factory is:
 * - a set of locators (PipServices uses [[Descriptor Descriptors]]) - one for each object type that needs to be included in this factory.
 * - a constructor (in which the object types are registered using the [[registerAsType]] method).
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
 * @see [[Descriptor]]
 * @see [[IFactory]]
 */
export declare class Factory implements IFactory {
    private _registrations;
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
    register(locator: any, factory: (locator: any) => any): void;
    /**
     * Registers a factory that can create instance of 'objectFactory' classes.
     *
     * @param locator 			the locator that is used to identify the object factory. Cannot be null.
     * @param objectFactory 	the object type that can be created by this factory. Cannot be null.
     *
     * @throws Error, when locator or factory parameters are null.
     */
    registerAsType(locator: any, objectFactory: any): void;
    /**
     * Checks if the factory contains the given locator.
     *
     * @param locator 	the locator to search for in this factory.
     * @returns			the locator that was found or null otherwise.
     */
    canCreate(locator: any): any;
    /**
     * Creates an object using the given locator.
     *
     * @param locator 	the locator of the factory that needs to be called.
     * @returns the object that was created by the factory with the given locator.
     *
     * @throws a CreateException if it fails to create an object using the given locator.
     */
    create(locator: any): any;
}
