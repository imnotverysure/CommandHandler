import { StringOption } from "./StringOption";
import { IntOption } from "./IntOption";
import { FloatOption } from "./FloatOption";
import { BooleanOption } from "./BooleanOption";
import { PlayerOption } from "./PlayerOption";
import { CoordinateOption } from "./CoordinateOption";
/**
 * The types of command options
 */
declare const OptionTypes: {
    /**
     * The string command option type
     */
    string: typeof StringOption;
    /**
     * The int command option type
     */
    int: typeof IntOption;
    /**
     * The float command option type
     */
    float: typeof FloatOption;
    /**
     * The boolean command option type
     */
    boolean: typeof BooleanOption;
    /**
     * The Player command option type
     */
    Player: typeof PlayerOption;
    /**
     * The Coordinate command option type
     */
    Coordinate: typeof CoordinateOption;
};
export { OptionTypes, StringOption, IntOption, FloatOption, BooleanOption, PlayerOption, CoordinateOption };
