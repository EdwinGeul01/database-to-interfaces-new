import * as mysql2 from 'mysql2/promise'
import { IconnectionProperties } from '../../../interfaces/connection-properties'
import { IColumnDescription, dataBaseHandler } from '../../_interfaces/database-handler'

/**
 * @class databaseController
 * @name databaseController
 * @description MySQL database handler class that extends the base dataBaseHandler.
 * It implements methods to interact with a MySQL database, such as running raw queries,
 * retrieving table names, and getting column descriptions.
 */
export default class databaseController extends dataBaseHandler {
	constructor(connectionProperties: IconnectionProperties) {
		super({
			...connectionProperties
		})
	}

	async getTablesNames(): Promise<string[]> {
		//example promise
		console.log('Fetching table names from MySQL database:', this.connectionProps.database)

		const tablesNames = await this.runRawQuery(
			'SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = ?',
			this.connectionProps,
			[this.connectionProps.database]
		)

		const tablesNamesArray: string[] = tablesNames.map((table: any) => table.TABLE_NAME)
		return tablesNamesArray;
	}

	async getTablesMapWithColumns(): Promise<Map<string, IColumnDescription[]>> {
		const tableColumns: IColumnDescription[] = await this.runRawQuery(
			`SELECT 
                COLUMN_NAME AS 'Column',
                COLUMN_TYPE AS 'Type',
                IS_NULLABLE AS 'Nullable',
                COLUMN_KEY AS 'Key',
                COLUMN_DEFAULT AS 'DefaultValue',
                EXTRA AS 'Extras',
                COLUMN_COMMENT AS 'Comment',
                TABLE_NAME
            FROM 
                information_schema.columns
            WHERE 
                TABLE_SCHEMA = ?`,
			this.connectionProps,
			[this.connectionProps.database]
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

	protected async runRawQuery(
		query: string,
		connectionProperties: IconnectionProperties,
		params?: any
	): Promise<any> {
		// Implement the logic to run a raw query against the MySQL database
		// This is a placeholder implementation
		let connection: mysql2.Connection | null = null
		try {
			connection = await mysql2.createConnection({
				host: connectionProperties.host,
				port: connectionProperties.port,
				user: connectionProperties.user,
				password: connectionProperties.password,
				database: connectionProperties.database
			})
		} catch (error) {
			throw 'Error connecting to MySQL, check your connection properties.'
		}

		const queryResult = await connection.execute(query, params)

		await connection.end()

		return queryResult[0] // Return the result of the query
	}
}
