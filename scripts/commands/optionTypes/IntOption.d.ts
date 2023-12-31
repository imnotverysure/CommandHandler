import { IntTypeOption, ValidationResult } from "../@types";
import { OptionType } from "./Abstract";
export declare class IntOption extends OptionType<IntTypeOption> {
    name: "int";
    protected __options: Required<IntTypeOption>;
    protected getMatches(value: any): {
        isInt: boolean;
        isWithinRange: boolean;
    };
    verify(value: any): boolean;
    validate(value: any): ValidationResult;
    parse(value: any): number;
}
