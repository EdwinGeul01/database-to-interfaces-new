import { IconnectionProperties } from '../interfaces/connection-properties';
import { dataBaseHandler } from './_interfaces/database-handler';
interface IloadModulesReturn {
    databasesAvailable: Map<string, dataBaseHandler>;
}
/**
 * Load all database handler modules from the specified directory (for default in /databases).
 * @param connectionProps - The connection properties to be passed to each database handler.
 * @returns  an object containing a map of available database handlers.
 */
export declare function loadModules(connectionProps: IconnectionProperties): IloadModulesReturn;
export {};
