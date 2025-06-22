import { IconnectionProperties } from '../../interfaces/connection-properties';
import { dataBaseHandler } from '../../repo/_interfaces/database-handler';
/**
 * Initialize the database modules and return the database handler.
 * @param connectionProps - the connection properties to the database
 * @param DBModuleToUse - the database module to use (e.g., 'mysql', 'postgresql')
 * @returns
 */
export declare function initModules(DBModuleToUse: string, connectionProps: IconnectionProperties & {
    [key: string]: any;
}): dataBaseHandler;
