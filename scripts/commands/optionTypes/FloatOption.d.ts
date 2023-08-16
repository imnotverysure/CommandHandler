import { FloatTypeOption, ValidationResult } from "../@types";
import { OptionType } from "./Abstract";
export declare class FloatOption extends OptionType<FloatTypeOption> {
    name: "float";
    protected _options: Required<FloatTypeOption>;
    protected getMatches(value: any): {
        isFloat: boolean;
        isWithinRange: boolean;
        isNonFloat: boolean;
    };
    verify(value: any): boolean;
    validate(value: any): ValidationResult;
    parse(value: any): number;
}
