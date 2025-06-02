import { IconnectionProperties } from '../../interfaces/connection-properties'
import { dataBaseHandler } from '../../repo/_interfaces/database-handler'
import { loadModules, loadModulesAvaliables } from '../../repo/LoadModules'

/**
 * get the available database modules and return the database handler.
 * @param connectionProps - the connection properties to the database
 * @param DBModuleToUse - the database module to use (e.g., 'mysql', 'postgresql')
 * @returns
 */
export async function getAvailableModules(): Promise<string[]> {
	const modulesAvailables = await loadModulesAvaliables()

	const databasesAvailable = modulesAvailables.databasesAvailable.keys()

	const modulesList = Array.from(databasesAvailable)

	return modulesList
}
