import { IFeedback } from "./@types";
import { Interaction } from "./Interaction";
import { Data } from "./structures/Data";
/**
 * The enumeration of feedback codes sent to the interaction
 */
export declare enum FeedbackCode {
    /**
     * The feedback code sent if the command is invalid
     */
    InvalidCommand = 520,
    /**
     * The feedback code sent if the user had invalid command execution permission
     */
    InvalidExecutionPermission = 521,
    /**
     * The feedback code setnt if the argument is invalid
     */
    InvalidArgument = 522
}
/**
 * Responds to the interaction provided with the feedback data
 * @param interaction The data of the command interaction
 * @param feedback The data of the feedback that determines the response to be sent
 */
export declare function respond(interaction: Interaction, feedback: IFeedback): void;
/**
 * Responds to the interaction whenever an invalid command is executed
 * @param interaction The data of the command interaction
 */
export declare function invalidCommand(interaction: Interaction, command?: string): void;
/**
 * Responds to the interaction whenever a command is executed with insufficient permissions
 * @param interaction The data of the command interaction
 */
export declare function invalidExecutionPermission(interaction: Interaction, command?: string): void;
/**
 * Responds to the interaction whenever a command is executed with invalid arguments
 * @param interaction The data of the command interaction
 */
export declare function invalidArgument(interaction: Interaction, arg?: string, data?: Data, message?: string): void;
