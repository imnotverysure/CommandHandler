/**
 * Defers the execution of the callback function passed
 * @param data The data to be passed to the callback function
 * @param callback The function executed a specific amount of ticks
 * @param ticks The delay in ticks before the callback function is executed
 */
export declare function defer<T extends unknown>(data: T, callback: (arg: T) => void, ticks?: number): void;
/**
 * Formats a string with the code provided
 * @param code The code of the color/format
 * @param text The text to color/format
 * @returns The formatted string
 */
export declare function S(code: string, text: string | number | boolean | undefined): string;
/**
 * Combines the style code and the Minecraft styling prefix
 * @param code The Minecraft styling code to be added next to "§"
 */
export declare function _S(code: string): string;
/**
 * Checks if the value provided is of type string
 * @param value The value to be checked
 * @returns Returns `true` if the value provided is of type string, otherwise, `false`
 */
export declare function isString(value: any): boolean;
/**
 * Checks if the value provided is of type int
 * @param value The value to be checked
 * @returns Returns `true` if the value provided is of type int, otherwise, `false`
 */
export declare function isInt(value: any): boolean;
/**
 * Checks if the value provided is of type float
 * @param value The value to be checked
 * @returns Returns `true` if the value provided is of type float, otherwise, `false`
 */
export declare function isFloat(value: any): boolean;
/**
 * Checks if the value provided is of type boolean
 * @param value The value to be checked
 * @returns Returns `true` if the value provided is of type boolean, otherwise, `false`
 */
export declare function isBoolean(value: any): boolean;
/**
 * Checks if the value provided is of type Player
 * @param value The value to be checked
 * @returns Returns `true` if the value provided is of type Player, otherwise, `false`
 */
export declare function isPlayer(value: any): boolean;
/**
 * Checks if the value provided is of type Coordinate
 * @param value The value to be checked
 * @returns Returns `true` if the value provided is of type Coordinate, otherwise, `false`
 */
export declare function isCoordinate(value: any, allowRelative?: boolean): boolean;
