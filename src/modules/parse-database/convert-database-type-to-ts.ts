import { IColumnDescription } from '../../repo/_interfaces/database-handler'
import { determineSameValueInTypescript } from './determine-same-value-in-ts'

/**
 * Get the property of the column but in typescript interface
 * @param c the column to determine the type
 * @returns the property of the column in interface like  " [key: string]: any "
 */
export function convertDatabaseTypeToTypescriptInterfaceString(c: IColumnDescription): string {
	let columnString = ``

	//if the column include spaces
	if (c.Column.includes(' ')) {
		c.Column = '["' + c.Column + '"]'
	}

	if (c.Comment) {
		columnString += `/** \n* ${c.Comment} \n*/\n`
	}

	if (c.Nullable == 'YES') {
		columnString += `${c.Column}?: `
	} else {
		columnString += `${c.Column}: `
	}

	const typeToTypescript = determineSameValueInTypescript(c.Type)
	//determinie the type
	columnString += typeToTypescript

	if (c.Nullable == 'YES') {
		columnString += ' | null'
	}

	columnString += ';\n'

	return columnString
}
