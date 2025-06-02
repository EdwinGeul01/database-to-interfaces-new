export interface IconnectionProperties {
	/**
	 * database name .
	 */
	database: string
	/**
	 * host of the database.
	 * @example 'localhost'
	 */
	host: string
	/**
	 * port of the database.
	 * @example 3306
	 */
	port: number
	/**
	 * user of the database.
	 * @example 'root'
	 * */
	user: string
	/**
	 * password of the database.
	 * @example '1234'
	 */
	password: string
}
