import { Player } from "@minecraft/server";
import { Interaction } from "./Interaction";
import { FeedbackCode } from "./Feedback";
import { OptionTypes } from "./optionTypes";
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export declare type DataType = "Command" | "Subcommand" | "Option";
export declare type PermissionFunction = (sender: Player) => boolean;
export interface IData extends Readonly<Required<DataOptions>> {
}
export interface DataOptions {
    /**
     * The depth of the data
     */
    depth?: number;
    /**
     * The name of the data
     */
    name: string;
    /**
     * The aliases of the data
     */
    aliases?: string[];
    /**
     * The function that determines the permission of the command user
     */
    permission?: PermissionFunction;
    /**
     * The description of the data
     */
    description?: string;
    /**
     * The subcommands of the data
     */
    subcommands?: SubcommandOptions[];
    /**
     * The options of the data
     */
    options?: OptionOptions[];
}
export declare type CommandCallback = (data: Interaction) => void;
export interface ICommand extends Readonly<Required<CommandOptions>> {
}
export interface CommandOptions extends Omit<DataOptions, "depth"> {
    /**
     * The callback function executed as the command is ran
     * @param data The data of the command interaction
     */
    callback: CommandCallback;
}
export interface ISubcommand extends Readonly<Required<SubcommandOptions>> {
}
export interface SubcommandOptions extends Omit<DataOptions, "depth"> {
}
export interface IOption extends Readonly<Required<OptionOptions>> {
}
export interface OptionOptions extends Omit<DataOptions, "depth"> {
    /**
     * The type of the command option
     */
    type?: CommandTypeOption;
    /**
     * Whether the command option is optional
     */
    optional?: boolean;
}
export interface CommandRegistrationOptions extends Omit<CommandOptions, "callback"> {
    subcommands?: Omit<SubcommandOptions, "memory">[];
    options?: Omit<OptionOptions, "memory">[];
}
export declare type CommandOptionTypeName = keyof CommandOptionTypes;
export declare type CommandOptionTypes = typeof OptionTypes;
export declare type CommandOptionType = CommandOptionTypes[CommandOptionTypeName];
export declare type ValueTypes<T extends CommandOptionTypes = CommandOptionTypes> = {
    [K in keyof T]: T[K] extends CommandOptionType ? ReturnType<InstanceType<T[K]>["parse"]> : never;
};
export declare type ValueType = ValueTypes[keyof ValueTypes];
export interface IFeedback {
    /**
     * The code of the feedback data
     */
    code: null | FeedbackCode;
    /**
     * The data of the feedback
     */
    data: any[];
}
export interface ValidationResult<V extends boolean = boolean> {
    /**
     * Whether the value provided is valid
     */
    valid: V;
    /**
     * An optional message returned if "valid" is false
     */
    message: V extends false ? string : undefined;
}
export interface ResolutionData<K extends CommandOptionTypeName = CommandOptionTypeName, V extends ValueType = ValueTypes[K]> {
    /**
     * The name of the resolved data
     */
    name: string;
    /**
     * The depth of the resolved data
     */
    depth: number;
    /**
     * The value of the resolved data
     */
    value: V;
    /**
     * The type of the resolved data's value
     */
    type: InstanceType<CommandOptionTypes[K]>;
    /**
     * The type of the resolved data
     */
    dataType: DataType;
}
export interface RawUsage {
    /**
     * The usage of the data
     */
    usage: string;
    /**
     * The function that determines the permission of the command user
     */
    permission: PermissionFunction;
}
export interface TypeOption<T extends CommandOptionTypeName = CommandOptionTypeName> {
    /**
     * The type of the command option
     */
    type?: T;
}
export interface StringTypeOption extends TypeOption<"string"> {
    /**
     * The length of the string from `min` (`length[0]`) to `max` (`length[1]`)
     *
     * NOTE: This is set to `[0, Infinity]` by default, and the `min` can not be lower than `0`
     */
    length?: [number, number];
}
export interface IntTypeOption extends TypeOption<"int"> {
    /**
     * The range of the value from `min` (`range[0]`) to `max` (`range[1]`)
     *
     * NOTE: This is set to `[-Infinity, Infinity]` by default
     */
    range?: [number, number];
}
export interface FloatTypeOption extends TypeOption<"float"> {
    /**
     * The range of the value from `min` (`range[0]`) to `max` (`range[1]`)
     *
     * NOTE: This is set to `[-Infinity, Infinity]` by default
     */
    range?: [number, number];
    /**
     * Whether to allow integer values
     *
     * NOTE: This is set to `true` by default
     */
    allowInt?: boolean;
}
export interface BooleanTypeOption extends TypeOption<"boolean"> {
}
export interface PlayerTypeOption extends TypeOption<"Player"> {
    /**
     * Whether to allow the name of the player as the value
     *
     * NOTE: This is set to `true` by default
     */
    allowName?: boolean;
    /**
     * Whether to allow the id of the player as the value
     */
    allowId?: boolean;
}
export interface CoordinateTypeOption extends TypeOption<"Coordinate"> {
    /**
     * Whether to allow relative coordinates
     *
     * NOTE: This is set to `true` by default
     */
    allowRelative?: boolean;
}
export interface CommandTypeOptions {
    string: StringTypeOption;
    int: IntTypeOption;
    float: FloatTypeOption;
    boolean: BooleanTypeOption;
    Player: PlayerTypeOption;
    Coordinate: CoordinateTypeOption;
}
export declare type CommandTypeOption = CommandTypeOptions[keyof CommandTypeOptions];
