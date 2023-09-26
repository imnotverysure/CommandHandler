import { BooleanTypeOption, ValidationResult } from "../@types";
import { OptionType } from "./Abstract";
export declare class BooleanOption extends OptionType<BooleanTypeOption> {
    name: "boolean";
    protected __options: Required<BooleanTypeOption>;
    verify(value: any): boolean;
    validate(value: any): ValidationResult;
    parse(value: any): boolean;
}
