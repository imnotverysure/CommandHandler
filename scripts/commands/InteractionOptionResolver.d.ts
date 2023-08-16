import { CommandOptionTypeName, IFeedback, ResolutionData, ValueTypes } from "./@types";
import { Interaction } from "./Interaction";
import { Command } from "./structures/Command";
import { Data } from "./structures/Data";
export declare class InteractionOptionResolver {
    protected _data: ResolutionData[];
    protected _interaction: Interaction;
    protected _root: Command;
    protected _feedback: IFeedback;
    constructor(interaction: Interaction);
    protected resolve(): undefined;
    /**
     * Modifies the data whenever the command is successfully executed
     * @param path The path to be used when a command succeeds
     * @param idealRoute The ideal route of the command executed
     */
    protected modify(path: string[], idealRoute?: Data[]): string[];
    /**
     * Traces the provided path every argument step as long as the current argument and data matches
     * @param path The path to be traced
     */
    protected trace(path?: string[]): Data[];
    /**
     * The feedback data of the option resolver
     */
    get feedback(): IFeedback;
    /**
     * Returns the name of the command executed
     */
    getCommand(): string;
    /**
     * Retrieves the name of the subcommand with the name specified
     * @param name The name of the subcommand to be fetched
     */
    getSubcommand(name: string): string;
    /**
     * Retrieves the name of the subcommand with the depth specified
     * @param depth The depth of the subcommand to be fetched
     */
    getSubcommand(depth: number): string;
    /**
     * Retrieves the resolution data of the option with the provided name and type
     * @param name The name of the option to be retrieved
     * @param type The type of the option to be retrieved
     */
    protected getOptionData<K extends CommandOptionTypeName, P extends boolean = true>(name: string, type: K, parse?: P): ResolutionData<K, P extends true ? ValueTypes<{
        string: typeof import("./optionTypes").StringOption;
        int: typeof import("./optionTypes").IntOption;
        float: typeof import("./optionTypes").FloatOption;
        boolean: typeof import("./optionTypes").BooleanOption;
        Player: typeof import("./optionTypes").PlayerOption;
        Coordinate: typeof import("./optionTypes").CoordinateOption;
    }>[K] : string>;
    /**
     * Retrieves the option with the name and type provided
     * @param name The name of the option to be retrieved
     * @param type The type of the option to be retrieved
     */
    protected getOption<K extends CommandOptionTypeName>(name: string, type: K): ValueTypes<{
        string: typeof import("./optionTypes").StringOption;
        int: typeof import("./optionTypes").IntOption;
        float: typeof import("./optionTypes").FloatOption;
        boolean: typeof import("./optionTypes").BooleanOption;
        Player: typeof import("./optionTypes").PlayerOption;
        Coordinate: typeof import("./optionTypes").CoordinateOption;
    }>[K];
    /**
     * Retrieves the command option of type string with the given name
     * @param name The name of the string option type to be retrieved
     */
    getString(name: string): string;
    /**
     * Retrieves the command option of type int with the given name
     * @param name The name of the int option type to be retrieved
     */
    getInt(name: string): number;
    /**
     * Retrieves the command option of type float with the given name
     * @param name The name of the float option type to be retrieved
     */
    getFloat(name: string): number;
    /**
     * Retrieves the command option of type boolean with the given name
     * @param name The name of the boolean option type to be retrieved
     */
    getBoolean(name: string): boolean;
    /**
     * Retrieves the command option of type player with the given name
     * @param name The name of the player option type to be retrieved
     */
    getPlayer(name: string): import("@minecraft/server").Player;
    /**
     * Retrieves the command option of type coordinate with the given name
     * @param name The name of the coordinate option type to be retrieved
     * @param axis The axis of the coordinate to be parsed
     */
    protected getCoordinate(name: string, axis: "x" | "y" | "z"): number;
    /**
     * Retrieves the command option of type x coordinate with the given name
     * @param name The name of the x coordinate option type to be retrieved
     */
    getCoordinateX(name: string): number;
    /**
     * Retrieves the command option of type y coordinate with the given name
     * @param name The name of the y coordinate option type to be retrieved
     */
    getCoordinateY(name: string): number;
    /**
     * Retrieves the command option of type z coordinate with the given name
     * @param name The name of the z coordinate option type to be retrieved
     */
    getCoordinateZ(name: string): number;
}
