/**
 *  Determine the type of the column in typescript based on the mysql type.
 * @param {string} mysqlType  the type of the column
 * @returns the type of the column in typescript
 * @example int -> number, varchar -> string, date -> Date | string
 */
export declare function determineSameValueInTypescript(mysqlType: string): string;
