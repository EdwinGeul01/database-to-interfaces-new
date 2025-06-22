import { IColumnDescription } from '../../repo/_interfaces/database-handler';
/**
 * Get the property of the column but in typescript interface
 * @param c the column to determine the type
 * @returns the property of the column in interface like  " [key: string]: any "
 */
export declare function convertDatabaseTypeToTypescriptInterfaceString(c: IColumnDescription): string;
