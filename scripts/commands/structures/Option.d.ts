import { OptionOptions, ISubcommand, SubcommandOptions, IOption } from "../@types";
import { Data } from "./Data";
import { Subcommand } from "./Subcommand";
export declare class Option extends Data {
    /**
     * The type of the command option
     */
    readonly type: import("../optionTypes").StringOption | import("../optionTypes").IntOption | import("../optionTypes").FloatOption | import("../optionTypes").BooleanOption | import("../optionTypes").PlayerOption | import("../optionTypes").CoordinateOption;
    /**
     * Whether the command option is optional
     */
    readonly optional: boolean;
    /**
     * Creates an option object
     * @param options The options of the command option to be created
     */
    constructor(options: OptionOptions);
    protected convertSubcommands(arr: (ISubcommand | SubcommandOptions)[]): Subcommand[];
    protected convertOptions(arr: (IOption | OptionOptions)[], _Data?: typeof Option): Option[];
}
