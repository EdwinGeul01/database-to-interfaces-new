import { availableModules } from '../../config/avalible-modules'
/**
 * get the available database modules and return the database handler.
 * @param connectionProps - the connection properties to the database
 * @param DBModuleToUse - the database module to use (e.g., 'mysql', 'postgresql')
 * @returns
 */
export async function getAvailableModules(): Promise<string[]> {
	return availableModules
}
