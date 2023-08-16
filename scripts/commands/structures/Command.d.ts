import { CommandOptions, IOption, ISubcommand, OptionOptions, SubcommandOptions } from "../@types";
import { Data } from "./Data";
import { Interaction } from "../Interaction";
import { Subcommand } from "./Subcommand";
import { Option } from "./Option";
export declare class Command extends Data {
    /**
     * The callback function executed as the command is ran
     * @param data The data of the command interaction
     */
    readonly callback: (data: Interaction) => void;
    /**
     * Creates a command object
     * @param options The options of the command to be created
     */
    constructor(options: CommandOptions);
    protected convertSubcommands(arr: (ISubcommand | SubcommandOptions)[]): Subcommand[];
    protected convertOptions(arr: (IOption | OptionOptions)[], _Data?: typeof Option): Option[];
}
