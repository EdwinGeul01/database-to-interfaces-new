import { IconnectionProperties } from '../../interfaces/connection-properties';
export interface IColumnDescription {
    Column: string;
    Type: string;
    Nullable: string;
    Key: string;
    DefaultValue: string | null;
    Extras: string;
    Comment: string;
    TABLE_NAME: string;
    /**
     * this is not a real property of the column, but it is used to determine the prefix of the column.
     * @example 'DB_' on the table user will be 'DB_user'
     */
    prefix?: string;
}
export declare abstract class dataBaseHandler<T extends IconnectionProperties = IconnectionProperties> {
    /**
     * The connection properties for the database handler.
     */
    connectionProps: T;
    constructor(connection: T);
    /**
     * Get the name of the database handler
     * @returns the name of all tables in the database
     */
    abstract getTablesNames(): Promise<string[]>;
    /**
     * Get  all tables in the database with their columns.
     * @returns a map of table names to their column descriptions
     *
     * `string` - the name of the table
     *
     * `IColumnDescription[]` - the columns of the table
     */
    abstract getTablesMapWithColumns(): Promise<Map<string, IColumnDescription[]>>;
    /**
     * this function tests the connection to the database.
     * @return a promise that resolves to true if the connection is successful, false otherwise.
     */
    abstract testConnection(): Promise<boolean>;
    /**
     * this funciton runs a raw query against the MySQL database.
     * @param query - The SQL query to be executed.
     * @param params - Optional parameters to be used in the query.
     */
    protected abstract runRawQuery(query: string, connectionProperties: IconnectionProperties, params?: any): Promise<any>;
}
