import { CommandTypeOption, TypeOption, ValidationResult, ValueType } from "../@types";
export declare class OptionType<T extends CommandTypeOption = TypeOption> {
    name: unknown;
    /**
     * Protected type options of the command option
     */
    protected _options: T;
    constructor(options: T);
    protected getMatches(value: any): {
        [K: string]: boolean;
    };
    /**
     * The options of the command option type
     */
    get options(): T;
    /**
     * Checks the value provided with the options of the command option type
     * @param value The value to be verified
     */
    verify(value: any): boolean;
    /**
     * Checks the value provided with the options of the command option type and returns a validation result object
     * @param value The value to be validated
     */
    validate(value: any): ValidationResult;
    /**
     * Parses the value provided with the options of the command option type
     * @param value The value to be parsed
     */
    parse(value: any): ValueType;
}
