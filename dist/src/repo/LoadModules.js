"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadModules = loadModules;
const mysql_handler_1 = __importDefault(require("./databases/mysql/mysql-handler"));
const posgres_handler_1 = __importDefault(require("./databases/posgres/posgres-handler"));
/**
 * Load all database handler modules from the specified directory (for default in /databases).
 * @param connectionProps - The connection properties to be passed to each database handler.
 * @returns  an object containing a map of available database handlers.
 */
function loadModules(connectionProps) {
    const databasesAvailable = new Map();
    //import first file
    databasesAvailable.set('mysql', new mysql_handler_1.default(Object.assign({}, connectionProps)));
    databasesAvailable.set('postgres', new posgres_handler_1.default(Object.assign({}, connectionProps)));
    return {
        databasesAvailable
    };
}
