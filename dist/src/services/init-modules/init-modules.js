"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModules = initModules;
const LoadModules_1 = require("../../repo/LoadModules");
/**
 * Initialize the database modules and return the database handler.
 * @param connectionProps - the connection properties to the database
 * @param DBModuleToUse - the database module to use (e.g., 'mysql', 'postgresql')
 * @returns
 */
function initModules(DBModuleToUse, connectionProps) {
    try {
        const result = (0, LoadModules_1.loadModules)(Object.assign({}, connectionProps));
        const databaseController = result.databasesAvailable.get(DBModuleToUse);
        if (!databaseController) {
            throw new Error(`${DBModuleToUse} database handler not found`);
        }
        return databaseController;
    }
    catch (error) {
        throw new Error(`Error initializing modules: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
