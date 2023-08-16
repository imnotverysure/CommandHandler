import { BooleanOption, CoordinateOption, FloatOption, IntOption, PlayerOption, StringOption } from "./optionTypes/index";
/**
 * The types of command options
 */
export declare const OptionTypes: {
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
