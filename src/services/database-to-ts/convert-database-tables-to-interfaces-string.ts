import { IColumnDescription } from '../../repo/_interfaces/database-handler'
import { convertDatabaseTypeToTypescriptInterfaceString } from '../../modules/parse-database/convert-database-type-to-ts'

/**
 *  convert a map of table names to their column descriptions into a TypeScript interface string.
 * @param tables  a mpa of table names to their column descriptions
 * @returns
 */
export function convertTablesToTypescriptInterface(tables: Map<string, IColumnDescription[]>): string {
	let interfaceString = ' // updated ' + new Date().toString() + '\n\n'
	interfaceString +=
		'export interface json_type {\
[key: string]: any;\
}\n\n'

	for (const [tableName, columnDescriptions] of tables.entries()) {
		interfaceString += `export interface ${''}${tableName} {\n`
		columnDescriptions.forEach((column) => {
			const columnString = convertDatabaseTypeToTypescriptInterfaceString(column)
			interfaceString += columnString
		})
		interfaceString += `}\n\n`
	}

	return interfaceString
}
