import { convertTablesToTypescriptInterface } from './src/services/database-to-ts/convert-database-tables-to-interfaces-string'
import { dataBaseHandler } from './src/repo/_interfaces/database-handler'
import { loadModules } from './src/repo/LoadModules'
import { saveInterfaceFile } from './src/services/save-interface-file/save-interface-file'
import { initModules } from './src/services/init-modules/init-modules'

export namespace databaseToInterfaces {
	export const convertDatabaseTypeToTypescriptInterfaceString = convertTablesToTypescriptInterface
	export const saveDatabaseInterfaceFile = saveInterfaceFile
	export const init = initModules
}

// main process
async function main() {
	try {
		const handler = await databaseToInterfaces.init('mysql', {
			database: 'midb',
			host: 'localhost',
			port: 3306,
			password: '1234',
			user: 'root'
		})

		if (!handler) {
			throw new Error('Database handler is not an instance of dataBaseHandler')
		}

		const tables = await handler.getTablesNames()
		console.log(`Tables found: ${tables.length}`)
		console.log(`Tables: ${tables.join(', ')}`)
	} catch (error) {
		console.log(error)
	}
}

main()
