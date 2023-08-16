import { Player } from "@minecraft/server";
import { PlayerTypeOption, ValidationResult } from "../@types";
import { OptionType } from "./Abstract";
export declare class PlayerOption extends OptionType<PlayerTypeOption> {
    name: "Player";
    protected _options: PlayerTypeOption;
    protected getMatches(value: any): {
        readonly isPlayer: boolean;
        readonly isIdOfPlayer: boolean;
        readonly isNameOfPlayer: true;
    };
    verify(value: any): boolean;
    validate(value: any): ValidationResult;
    parse(value: any): Player;
}
