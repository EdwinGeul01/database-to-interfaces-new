"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTablesToTypescriptInterface = convertTablesToTypescriptInterface;
const convert_database_type_to_ts_1 = require("../../modules/parse-database/convert-database-type-to-ts");
/**
 *  convert a map of table names to their column descriptions into a TypeScript interface string.
 * @param tables  a mpa of table names to their column descriptions
 * @returns
 */
function convertTablesToTypescriptInterface(tables, prefix = '') {
    let interfaceString = ' // updated ' + new Date().toString() + '\n\n';
    interfaceString +=
        'export interface json_type {\
[key: string]: any;\
}\n\n';
    for (const [tableName, columnDescriptions] of tables.entries()) {
        interfaceString += `export interface ${prefix}${tableName} {\n`;
        columnDescriptions.forEach((column) => {
            const columnString = (0, convert_database_type_to_ts_1.convertDatabaseTypeToTypescriptInterfaceString)(column);
            interfaceString += columnString;
        });
        interfaceString += `}\n\n`;
    }
    return interfaceString;
}
