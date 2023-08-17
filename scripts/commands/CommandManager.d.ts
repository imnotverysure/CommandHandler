import { CommandCallback, CommandRegistrationOptions } from "./@types";
import { Command } from "./structures/Command";
import { Interaction } from "./Interaction";
export declare class CommandManager {
    #private;
    /**
     * Protected prefix of custom commands
     */
    protected _prefix: string;
    constructor();
    /**
     * The prefix of custom commands
     */
    get prefix(): string;
    set prefix(prefix: string);
    /**
     * Registers a command with the provided options
     * @param command The options of the command to be created
     * @param callback The callback function of the command
     */
    register(command: CommandRegistrationOptions, callback: CommandCallback): void;
    /**
     * Executes a command
     * @param command The key of the command to be executed
     * @param data The data of the interaction
     * @returns The feedback data of the interaction's option resolution
     */
    execute(command: string, data: Interaction): import("./@types").IFeedback;
    /**
     * Retrieves the command with the key provided
     * @param command The key of the command to be retrieved
     */
    retrieve(command: string): Command | undefined;
    /**
     * Returns all of the commands within the command manager
     */
    retrieveCommands(): readonly Command[];
    /**
     * The default commands of the command manager
     */
    protected defaultCommands(): void;
    /**
     * The handler of chat commands
     */
    protected onChatCommand(): void;
}
export declare const commands: CommandManager;
