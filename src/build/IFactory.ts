/**
 * Interface for creating component factories. IFactory is part of the "factory design pattern", 
 * which is used to make factory classes. Factory classes are capable of creating instances of 
 * components that are requested using component locators.
 * 
 * Allows for implementaion of various factory types in a portable manner.  
 */
export interface IFactory {
	/**
	 * Checks if the factory is able to create the requested component 
	 * and returns its locator.
	 * 
	 * @param locator 		the locator of the requested component.
	 * @return 				the locator of the object that is to be created.
	 */
	canCreate(locator: any): any;

	/**
	 * Creates an instance of the component with the given locator.
	 * 
	 * @param locator 	the requested component.
	 * @return 			an instance of the created component.
	 * @throws 			a CreateException, when component creation fails.
	 * 
	 * @see CreateException
	 */
	create(locator: any): any;
}
