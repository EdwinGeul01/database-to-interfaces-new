"use strict";
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
const database_handler_1 = require("../../_interfaces/database-handler");
const pg_1 = require("pg");
/**
 * @class databaseController
 * @name databaseController
 * @description posgres database handler class that extends the base dataBaseHandler.
 * It implements methods to interact with a posgres database, such as running raw queries,
 * retrieving table names, and getting column descriptions.
 */
class databaseController extends database_handler_1.dataBaseHandler {
    constructor(connectionProperties) {
        super(Object.assign({}, connectionProperties));
    }
    getTablesNames() {
        return __awaiter(this, void 0, void 0, function* () {
            //example promise
            console.log('Fetching table names from postgres database:', this.connectionProps.database);
            const tablesNames = yield this.runRawQuery('SELECT table_name as "TABLE_NAME" FROM information_schema.tables WHERE table_schema = $1', this.connectionProps, [this.connectionProps.schema]);
            const tablesNamesArray = tablesNames.map((table) => table.TABLE_NAME);
            return tablesNamesArray;
        });
    }
    getTablesMapWithColumns() {
        return __awaiter(this, void 0, void 0, function* () {
            const tableColumns = yield this.runRawQuery(`SELECT 
				c.table_name AS "Table",
				c.column_name AS "Column",
				c.data_type AS "Type",
				c.is_nullable AS "Nullable",
				c.column_default AS "DefaultValue",
				tc.constraint_type AS "Key",
				pgd.description AS "Comment"
			FROM 
				information_schema.columns c
			LEFT JOIN 
				information_schema.key_column_usage kcu
				ON c.table_name = kcu.table_name
				AND c.column_name = kcu.column_name
				AND c.table_schema = kcu.table_schema
			LEFT JOIN 
				information_schema.table_constraints tc
				ON tc.constraint_name = kcu.constraint_name
				AND tc.table_name = c.table_name
			LEFT JOIN 
				pg_catalog.pg_statio_all_tables as st
				ON st.relname = c.table_name
			LEFT JOIN 
				pg_catalog.pg_description pgd 
				ON pgd.objoid = st.relid
				AND pgd.objsubid = c.ordinal_position
			WHERE 
				c.table_schema = $1 
			ORDER BY 
				c.table_name, c.ordinal_position;`, this.connectionProps, [this.connectionProps.schema]);
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
    testConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.runRawQuery('SELECT 1', this.connectionProps);
                return true;
            }
            catch (error) {
                console.error('Error testing PostgreSQL connection:', error);
                return false;
            }
        });
    }
    runRawQuery(query, connectionProperties, params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Implement the logic to run a raw query against the MySQL database
            // This is a placeholder implementation
            let connection = null;
            try {
                connection = new pg_1.Client({
                    host: connectionProperties.host,
                    port: connectionProperties.port,
                    user: connectionProperties.user,
                    password: connectionProperties.password,
                    database: connectionProperties.database
                });
                yield connection.connect();
            }
            catch (error) {
                throw 'Error connecting to PostgreSQL, check your connection properties.';
            }
            const queryResult = yield connection.query(query, params);
            yield connection.end();
            return queryResult.rows; // Return the result of the query
        });
    }
}
exports.default = databaseController;
