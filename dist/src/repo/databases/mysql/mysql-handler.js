"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2 = __importStar(require("mysql2/promise"));
const database_handler_1 = require("../../_interfaces/database-handler");
/**
 * @class databaseController
 * @name databaseController
 * @description MySQL database handler class that extends the base dataBaseHandler.
 * It implements methods to interact with a MySQL database, such as running raw queries,
 * retrieving table names, and getting column descriptions.
 */
class databaseController extends database_handler_1.dataBaseHandler {
    constructor(connectionProperties) {
        super(Object.assign({}, connectionProperties));
    }
    getTablesNames() {
        return __awaiter(this, void 0, void 0, function* () {
            const tablesNames = yield this.runRawQuery('SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = ?', this.connectionProps, [this.connectionProps.database]);
            const tablesNamesArray = tablesNames.map((table) => table.TABLE_NAME);
            return tablesNamesArray;
        });
    }
    testConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.runRawQuery('SELECT 1 + 1', this.connectionProps);
                return true;
            }
            catch (error) {
                console.error('Error testing MySQL connection');
                return false;
            }
        });
    }
    getTablesMapWithColumns() {
        return __awaiter(this, void 0, void 0, function* () {
            const tableColumns = yield this.runRawQuery(`SELECT 
                COLUMN_NAME AS 'Column',
                COLUMN_TYPE AS 'Type',
                IS_NULLABLE AS 'Nullable',
                COLUMN_KEY AS 'Key',
                COLUMN_DEFAULT AS 'DefaultValue',
                EXTRA AS 'Extras',
                COLUMN_COMMENT AS 'Comment',
                TABLE_NAME
            FROM 
                information_schema.columns
            WHERE 
                TABLE_SCHEMA = ?`, this.connectionProps, [this.connectionProps.database]);
            const tablesMap = new Map();
            for (const columnn of tableColumns) {
                let actualTableData = [];
                if (tablesMap.has(columnn.TABLE_NAME)) {
                    actualTableData = tablesMap.get(columnn.TABLE_NAME);
                }
                actualTableData.push({
                    Column: columnn.Column,
                    Type: columnn.Type,
                    Nullable: columnn.Nullable,
                    Key: columnn.Key,
                    DefaultValue: columnn.DefaultValue,
                    Extras: columnn.Extras,
                    Comment: columnn.Comment,
                    TABLE_NAME: columnn.TABLE_NAME
                });
                tablesMap.set(columnn.TABLE_NAME, actualTableData);
            }
            return tablesMap;
        });
    }
    runRawQuery(query, connectionProperties, params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement the logic to run a raw query against the MySQL database
            // This is a placeholder implementation
            let connection = null;
            try {
                connection = yield mysql2.createConnection({
                    host: connectionProperties.host,
                    port: connectionProperties.port,
                    user: connectionProperties.user,
                    password: connectionProperties.password,
                    database: connectionProperties.database
                });
            }
            catch (error) {
                throw new Error('Error connecting to MySQL, check your connection properties.');
            }
            const queryResult = yield connection.execute(query, params);
            yield connection.end();
            return queryResult[0]; // Return the result of the query
        });
    }
}
exports.default = databaseController;
