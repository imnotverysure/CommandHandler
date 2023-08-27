import { Player } from "@minecraft/server";
import { CommandManager } from "./CommandManager";
import { InteractionOptionResolver } from "./InteractionOptionResolver";
export declare class Interaction {
    protected _sender: Player;
    protected _interactionString: string;
    protected _manager: CommandManager;
    protected _options: InteractionOptionResolver;
    protected _arguments: string[];
    constructor(sender: Player, manager: CommandManager, interactionString: string);
    /**
     * The sender of the interaction string
     */
    get sender(): Player;
    /**
     * The interaction string that initialized a command interaction
     */
    get interactionString(): string;
    /**
     * The command manager
     */
    get manager(): CommandManager;
    /**
     * The resolved options of the interaction
     */
    get options(): InteractionOptionResolver;
    /**
     * The arguments of the interaction string
     */
    get arguments(): string[];
    /**
     * Checks if the interaction string is an execution of command that starts with the given prefix
     */
    isCommand(): boolean;
    /**
     * Sends a reply to the interaction
     * @param content The content to be sent
     * @param exclusive Whether the reply is to be sent exclusively
     */
    reply(content: string, exclusive?: boolean): void;
    protected execute(): void;
}
