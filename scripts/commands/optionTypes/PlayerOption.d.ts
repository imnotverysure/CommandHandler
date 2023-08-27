import { Player } from "@minecraft/server";
import { PlayerTypeOption, ValidationResult } from "../@types";
import { OptionType } from "./Abstract";
export declare class PlayerOption extends OptionType<PlayerTypeOption> {
    name: "Player";
    protected _options: Required<PlayerTypeOption>;
    protected getMatches(value: any): {
        isPlayer: boolean;
        isPlayerId: boolean;
        isPlayerName: boolean;
    };
    verify(value: any): boolean;
    validate(value: any): ValidationResult;
    parse(value: any): Player;
}
