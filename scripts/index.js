import { world } from "@minecraft/server";
import { _S, commands } from "./commands/index";

commands.register(
    {
        name: "ping",
        description: "Replies with 'Pong!'",
    },
    (interaction) => {
        interaction.reply("Pong!");
    }
);

commands.register(
    {
        name: "staffchat",
        aliases: ["schat"],
        permission: (sender) => sender.hasTag("staff"),
        description: "Allows staff members to send messages to each other",
        options: [
            {
                name: "message",
                description: "The message to be sent to the staff members",
                type: { type: "string" },
                optional: false,
            },
        ],
    },
    (interaction) => {
        const message = interaction.options.getString("message");

        world.getPlayers({ tags: ["staff"] }).map((player) =>
            // Send the message to the players with the "staff" tag
            player.sendMessage(`[STAFF] ${interaction.sender.name}: ${message}`)
        );
    }
);

commands.register(
    {
        name: "message",
        aliases: ["msg"],
        description: "Sends messages to players",
        options: [
            {
                name: "player",
                description: "The player to receive the message",
                type: { type: "Player" },
                optional: false,
                options: [
                    {
                        name: "message",
                        description: "The message to be sent",
                        type: { type: "string", length: [1, 100] },
                        optional: false,
                    },
                ],
            },
        ],
    },
    (interaction) => {
        const player = interaction.options.getPlayer("player");
        const message = interaction.options.getString("message");

        player.sendMessage(`${_S("o")}${_S("7")}${interaction.sender.name} >> ${message}`);
    }
);
