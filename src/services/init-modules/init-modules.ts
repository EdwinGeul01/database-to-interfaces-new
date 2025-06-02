import { IconnectionProperties } from '../../interfaces/connection-properties'
import { dataBaseHandler } from '../../repo/_interfaces/database-handler'
import { loadModules } from '../../repo/LoadModules'

/**
 * Initialize the database modules and return the database handler.
 * @param connectionProps - the connection properties to the database
 * @param DBModuleToUse - the database module to use (e.g., 'mysql', 'postgresql')
 * @returns
 */
export async function initModules(
	DBModuleToUse: string,
	connectionProps: IconnectionProperties
): Promise<dataBaseHandler> {
	const result = await loadModules(connectionProps)

	const databaseController = result.databasesAvailable.get(DBModuleToUse) as dataBaseHandler

	if (!databaseController) {
		throw new Error(`${DBModuleToUse} database handler not found`)
	}

	return databaseController
}
