import { readdir } from 'fs/promises'
import { IconnectionProperties } from '../interfaces/connection-properties'
import { dataBaseHandler } from './_interfaces/database-handler'

// the directory where database handlers are located
const _DIR_DATABASES_HANDLERS = './src/repo/databases'

interface IloadModulesReturn {
	databasesAvailable: Map<string, dataBaseHandler>
}

/**
 * Load all database handler modules from the specified directory (for default in /databases).
 * @param connectionProps - The connection properties to be passed to each database handler.
 * @returns A promise that resolves to an object containing a map of available database handlers.
 */
export async function loadModules(connectionProps: IconnectionProperties): Promise<IloadModulesReturn> {
	const databasesAvailable = new Map<string, dataBaseHandler>()

	//search for all directories in the databases folder
	const filesInDirectory = await readdir(_DIR_DATABASES_HANDLERS)

	//import first file
	for await (const fileName of filesInDirectory) {
		const module = await import('./databases/' + fileName + `/${fileName}-handler.js`)

		type DataBaseHandlerConstructor = new (connectionProperties?: IconnectionProperties) => dataBaseHandler

		const databaseHandlerBase = module.default as DataBaseHandlerConstructor

		const newDatabaseHandler = new databaseHandlerBase({ ...connectionProps })

		if (newDatabaseHandler instanceof dataBaseHandler) {
			databasesAvailable.set(fileName, newDatabaseHandler)
		} else {
			console.error(`Module ${fileName} does not extend dataBaseHandler`)
		}
	}

	return {
		databasesAvailable
	}
}

export async function loadModulesAvaliables(): Promise<IloadModulesReturn> {
	const databasesAvailable = new Map<string, dataBaseHandler>()

	//search for all directories in the databases folder
	const filesInDirectory = await readdir(_DIR_DATABASES_HANDLERS)

	//import first file
	for await (const fileName of filesInDirectory) {
		const module = await import('./databases/' + fileName + `/${fileName}-handler.js`)

		type DataBaseHandlerConstructor = new (connectionProperties?: IconnectionProperties) => dataBaseHandler

		const databaseHandlerBase = module.default as DataBaseHandlerConstructor

		const newDatabaseHandler = new databaseHandlerBase({
			database: '',
			host: '',
			port: 0,
			password: '',
			user: ''
		})

		if (newDatabaseHandler instanceof dataBaseHandler) {
			databasesAvailable.set(fileName, newDatabaseHandler)
		} else {
			console.error(`Module ${fileName} does not extend dataBaseHandler`)
		}
	}

	return {
		databasesAvailable
	}
}
