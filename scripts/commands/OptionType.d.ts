import * as server from "@minecraft/server";
export declare namespace OptionType {
    /**
     * The string command option type
     */
    const string: {
        verify: (value: any) => boolean;
        parse: (value: any) => string;
    };
    /**
     * The int command option type
     */
    const int: {
        verify: (value: any) => boolean;
        parse: (value: any) => number;
    };
    /**
     * The float command option type
     */
    const float: {
        verify: (value: any) => boolean;
        parse: (value: any) => number;
    };
    /**
     * The boolean command option type
     */
    const boolean: {
        verify: (value: any) => boolean;
        parse: (value: any) => boolean;
    };
    /**
     * THe Player command option type
     */
    const Player: {
        verify: (value: any) => boolean;
        parse: (value: any) => server.Player;
    };
    /**
     * The Coordinate command option type
     */
    const Coordinate: {
        verify: (value: any) => boolean;
        parse: (value: any, base?: number) => number;
    };
}
