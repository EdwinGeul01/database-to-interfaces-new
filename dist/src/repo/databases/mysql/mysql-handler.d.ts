import { IconnectionProperties } from '../../../interfaces/connection-properties';
import { IColumnDescription, dataBaseHandler } from '../../_interfaces/database-handler';
/**
 * @class databaseController
 * @name databaseController
 * @description MySQL database handler class that extends the base dataBaseHandler.
 * It implements methods to interact with a MySQL database, such as running raw queries,
 * retrieving table names, and getting column descriptions.
 */
export default class databaseController extends dataBaseHandler<IconnectionProperties> {
    constructor(connectionProperties: IconnectionProperties);
    getTablesNames(): Promise<string[]>;
    testConnection(): Promise<boolean>;
    getTablesMapWithColumns(): Promise<Map<string, IColumnDescription[]>>;
    protected runRawQuery(query: string, connectionProperties: IconnectionProperties, params?: any): Promise<any>;
}
