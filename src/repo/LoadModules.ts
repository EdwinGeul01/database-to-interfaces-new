import { IconnectionProperties } from '../interfaces/connection-properties'
import { dataBaseHandler } from './_interfaces/database-handler'
import mysqlHandler from './databases/mysql/mysql-handler'
import postgresHandler from './databases/posgres/posgres-handler'

interface IloadModulesReturn {
	databasesAvailable: Map<string, dataBaseHandler>
}

/**
 * Load all database handler modules from the specified directory (for default in /databases).
 * @param connectionProps - The connection properties to be passed to each database handler.
 * @returns  an object containing a map of available database handlers.
 */
export function loadModules(connectionProps: IconnectionProperties): IloadModulesReturn {
	const databasesAvailable = new Map<string, dataBaseHandler>()

	//import first file
	databasesAvailable.set('mysql', new mysqlHandler({ ...connectionProps }))
	databasesAvailable.set(
		'postgres',
		new postgresHandler({ ...(connectionProps as IconnectionProperties & { schema: string }) })
	)

	return {
		databasesAvailable
	}
}
