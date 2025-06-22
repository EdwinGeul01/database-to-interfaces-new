import { IconnectionProperties } from '../../../interfaces/connection-properties'
import { IColumnDescription, dataBaseHandler } from '../../_interfaces/database-handler'
import { Client } from 'pg'

/**
 * @class databaseController
 * @name databaseController
 * @description posgres database handler class that extends the base dataBaseHandler.
 * It implements methods to interact with a posgres database, such as running raw queries,
 * retrieving table names, and getting column descriptions.
 */
export default class databaseController extends dataBaseHandler<IconnectionProperties & { schema: string }> {
	constructor(connectionProperties: IconnectionProperties & { schema: string }) {
		super({
			...connectionProperties
		})
	}

	async getTablesNames(): Promise<string[]> {
		//example promise
		console.log('Fetching table names from postgres database:', this.connectionProps.database)

		const tablesNames = await this.runRawQuery(
			'SELECT table_name as "TABLE_NAME" FROM information_schema.tables WHERE table_schema = $1',
			this.connectionProps,
			[this.connectionProps.schema]
		)

		const tablesNamesArray: string[] = tablesNames.map((table: any) => table.TABLE_NAME)
		return tablesNamesArray
	}

	async getTablesMapWithColumns(): Promise<Map<string, IColumnDescription[]>> {
		const tableColumns: IColumnDescription[] = await this.runRawQuery(
			`SELECT 
				c.table_name AS "Table",
				c.column_name AS "Column",
				c.data_type AS "Type",
				c.is_nullable AS "Nullable",
				c.column_default AS "DefaultValue",
				tc.constraint_type AS "Key",
				pgd.description AS "Comment"
			FROM 
				information_schema.columns c
			LEFT JOIN 
				information_schema.key_column_usage kcu
				ON c.table_name = kcu.table_name
				AND c.column_name = kcu.column_name
				AND c.table_schema = kcu.table_schema
			LEFT JOIN 
				information_schema.table_constraints tc
				ON tc.constraint_name = kcu.constraint_name
				AND tc.table_name = c.table_name
			LEFT JOIN 
				pg_catalog.pg_statio_all_tables as st
				ON st.relname = c.table_name
			LEFT JOIN 
				pg_catalog.pg_description pgd 
				ON pgd.objoid = st.relid
				AND pgd.objsubid = c.ordinal_position
			WHERE 
				c.table_schema = $1 
			ORDER BY 
				c.table_name, c.ordinal_position;`,
			this.connectionProps,
			[this.connectionProps.schema]
		)

		const tablesMap: Map<string, IColumnDescription[]> = new Map()

		for (const columnn of tableColumns) {
			let actualTableData: IColumnDescription[] = []
			if (tablesMap.has(columnn.TABLE_NAME)) {
				actualTableData = tablesMap.get(columnn.TABLE_NAME)!
			}

			actualTableData.push({
				Column: columnn.Column,
				Type: columnn.Type,
				Nullable: columnn.Nullable,
				Key: columnn.Key,
				DefaultValue: columnn.DefaultValue,
				Extras: columnn.Extras,
				Comment: columnn.Comment,
				TABLE_NAME: columnn.TABLE_NAME
			})
			tablesMap.set(columnn.TABLE_NAME, actualTableData)
		}

		return tablesMap
	}

	async testConnection() {
		try {
			await this.runRawQuery('SELECT 1', this.connectionProps)
			return true
		} catch (error) {
			console.error('Error testing PostgreSQL connection:', error)
			return false
		}
	}

	protected async runRawQuery(
		query: string,
		connectionProperties: IconnectionProperties,
		params?: any
	): Promise<any> {
		// Implement the logic to run a raw query against the MySQL database
		// This is a placeholder implementation
		let connection: Client | null = null
		try {
			connection = new Client({
				host: connectionProperties.host,
				port: connectionProperties.port,
				user: connectionProperties.user,
				password: connectionProperties.password,
				database: connectionProperties.database
			})
			await connection.connect()
		} catch (error) {
			throw 'Error connecting to PostgreSQL, check your connection properties.'
		}

		const queryResult = await connection.query(query, params)

		await connection.end()

		return queryResult.rows // Return the result of the query
	}
}
