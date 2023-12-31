import { StringTypeOption, ValidationResult } from "../@types";
import { OptionType } from "./Abstract";
export declare class StringOption extends OptionType<StringTypeOption> {
    name: "string";
    protected __options: Required<StringTypeOption>;
    protected getMatches(value: any): {
        isString: boolean;
        isValidLength: boolean;
    };
    verify(value: any): boolean;
    validate(value: any): ValidationResult;
    parse(value: any): string;
}
