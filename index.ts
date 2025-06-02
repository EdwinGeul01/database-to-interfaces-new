import { convertTablesToTypescriptInterface } from './src/services/database-to-ts/convert-database-tables-to-interfaces-string'
import { dataBaseHandler } from './src/repo/_interfaces/database-handler'
import { loadModules } from './src/repo/LoadModules'
import { saveInterfaceFile } from './src/services/save-interface-file/save-interface-file'
import { initModules } from './src/services/init-modules/init-modules'
import { getAvailableModules } from './src/services/init-modules/get-available-modules'

export namespace databaseToInterfaces {
	export const init = initModules
	export const convertDatabaseTypeToTypescriptInterfaceString = convertTablesToTypescriptInterface
	export const saveDatabaseInterfaceFile = saveInterfaceFile
}

// main process
async function main() {
	try {
		const handler = await databaseToInterfaces.init('posgres', {
			database: 'postgres',
			host: 'localhost',
			port: 5432,
			password: '1234',
			user: 'postgres',
			schema: 'public'
		})

		const modulesAvailable = await getAvailableModules()
		console.log('Available modules:', modulesAvailable)

		if (!handler) {
			throw new Error('Database handler is not an instance of dataBaseHandler')
		}

		const tables = await handler.getTablesMapWithColumns()
		const interfacesString = databaseToInterfaces.convertDatabaseTypeToTypescriptInterfaceString(tables)
		console.log('🚀 ~ main ~ tables:', interfacesString)
	} catch (error) {
		console.log(error)
	}
}

main()
