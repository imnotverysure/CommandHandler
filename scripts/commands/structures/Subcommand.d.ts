import { IOption, ISubcommand, SubcommandOptions, OptionOptions } from "../@types";
import { Data } from "./Data";
import { Option } from "./Option";
export declare class Subcommand extends Data {
    /**
     * Creates a subcommand object
     * @param options The options of the subcommand to be created
     */
    constructor(options: SubcommandOptions);
    protected convertSubcommands(arr: (ISubcommand | SubcommandOptions)[]): Subcommand[];
    protected convertOptions(arr: (IOption | OptionOptions)[], _Data?: typeof Option): Option[];
}
