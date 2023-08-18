import { Player } from "@minecraft/server";
import { ISubcommand, IOption, DataOptions, SubcommandOptions, OptionOptions, RawUsage, PermissionFunction } from "../@types";
import { Subcommand } from "./Subcommand";
import { Option } from "./Option";
export declare abstract class Data {
    readonly depth: number;
    readonly name: string;
    readonly aliases: string[];
    readonly permission: PermissionFunction;
    readonly description: string;
    readonly subcommands: Subcommand[];
    readonly options: Option[];
    constructor(options: DataOptions);
    /**
     * Checks whether the given key is a key of the command
     * @returns Returns `true` if the key provided is a key of the command, otherwise `false`
     */
    isKey(key: string): boolean;
    /**
     * Returns the keys of the command\
     */
    keys(): string[];
    /**
     * Returns the route that best matches the provided path of arguments
     * @param path The path to be used for matching the routes of the data
     */
    getRoute(path: string[]): Data[];
    /**
     * Returns the possible routes of the branch by following the sub-branches and their sub-branches recursively
     * @param branch The branch to get the possible routes of
     */
    getRoutes(branch?: Data): Data[][];
    /**
     * Returns the subbranches of the branch provided
     * @param branch The branch to return the subbranches of
     */
    getSubbranches(branch?: Data): (Subcommand | Option)[];
    /**
     * Retrieves all of the sub-branches connected from the branch
     *
     * NOTE: This method fetches the sub-branches of the provided branch and of the sub-branches of the same branch recursively
     * @param branch The branch to fetch the sub-branches of
     */
    protected getAllSubbranches(branch?: Data): Data[][];
    /**
     * Generates possible usages of the command
     */
    generateRawUsages(): RawUsage[][];
    /**
     * Returns the usages that matches the permission of the data with the user
     * @param user The user of the data
     */
    generateUsages(user: Player): RawUsage[][];
    protected convertSubcommands(subcommands: (ISubcommand | SubcommandOptions)[], _Data?: typeof Subcommand): Subcommand[];
    protected convertOptions(options: (IOption | OptionOptions)[], _Data?: typeof Option): Option[];
}
