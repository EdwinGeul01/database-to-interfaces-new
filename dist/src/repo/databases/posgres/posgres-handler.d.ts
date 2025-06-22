import { IconnectionProperties } from '../../../interfaces/connection-properties';
import { IColumnDescription, dataBaseHandler } from '../../_interfaces/database-handler';
/**
 * @class databaseController
 * @name databaseController
 * @description posgres database handler class that extends the base dataBaseHandler.
 * It implements methods to interact with a posgres database, such as running raw queries,
 * retrieving table names, and getting column descriptions.
 */
export default class databaseController extends dataBaseHandler<IconnectionProperties & {
    schema: string;
}> {
    constructor(connectionProperties: IconnectionProperties & {
        schema: string;
    });
    getTablesNames(): Promise<string[]>;
    getTablesMapWithColumns(): Promise<Map<string, IColumnDescription[]>>;
    testConnection(): Promise<boolean>;
    protected runRawQuery(query: string, connectionProperties: IconnectionProperties, params?: any): Promise<any>;
}
