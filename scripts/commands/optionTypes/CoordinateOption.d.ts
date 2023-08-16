import { CoordinateTypeOption, ValidationResult } from "../@types";
import { OptionType } from "./Abstract";
export declare class CoordinateOption extends OptionType<CoordinateTypeOption> {
    name: "Coordinate";
    protected _options: Required<CoordinateTypeOption>;
    protected getMatches(value: any): {
        isCoordinate: boolean;
        isRelativeCoordinate: boolean;
    };
    verify(value: any): boolean;
    validate(value: any): ValidationResult;
    parse(value: any, base?: number): number;
}
