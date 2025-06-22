"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineSameValueInTypescript = determineSameValueInTypescript;
/**
 *  Determine the type of the column in typescript based on the mysql type.
 * @param {string} mysqlType  the type of the column
 * @returns the type of the column in typescript
 * @example int -> number, varchar -> string, date -> Date | string
 */
function determineSameValueInTypescript(mysqlType) {
    //if is string
    if (mysqlType.includes('varchar') ||
        mysqlType.includes('text') ||
        mysqlType.includes('char') ||
        mysqlType.includes('character varying') ||
        mysqlType.includes('character')) {
        return 'string';
    }
    //if is number
    if (mysqlType.includes('int') ||
        mysqlType.includes('bigint') ||
        mysqlType.includes('decimal') ||
        mysqlType.includes('float') ||
        mysqlType.includes('double') ||
        mysqlType.includes('boolean')) {
        return 'number';
    }
    //if is boolean
    if (mysqlType.includes('boolean')) {
        return 'boolean';
    }
    //if is date
    if (mysqlType.includes('date') || mysqlType.includes('time') || mysqlType.includes('datetime')) {
        return 'Date | string';
    }
    // if is json
    if (mysqlType.includes('json')) {
        return 'json_type';
    }
    return 'any';
}
