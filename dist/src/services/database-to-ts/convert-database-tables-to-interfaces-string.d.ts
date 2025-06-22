import { IColumnDescription } from '../../repo/_interfaces/database-handler';
/**
 *  convert a map of table names to their column descriptions into a TypeScript interface string.
 * @param tables  a mpa of table names to their column descriptions
 * @returns
 */
export declare function convertTablesToTypescriptInterface(tables: Map<string, IColumnDescription[]>, prefix?: string): string;
