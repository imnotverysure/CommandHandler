# **Command Handler**

A command handler which manages the creation and execution of custom commands with the utilization of the Scripting-API of Minecraft Bedrock Edition.

This command handler allows the execution commands with dynamic arrangements of subcommands and options.

<br>

### **Getting Started**

To create a custom command, the `commands` object must be imported from `/commands/index.js` inside of the scripts folder. The `commands` object is an instance of the `CommandManager` class which manages commands and handles their creation. The `register()` method must be called with the command options as the argument provided.

```js
import { commands } from "./commands/index";

// Register a command by providing a command option object to the register method
commands.register(
    {
        name: "ping",
        description: "Replies with pong!",
    },
    (interaction) => {
        interaction.reply("Pong!");
    }
);
```

<br>

Moreover, commands can have subcommands and options. Data within the command management are structured similar to a data tree with commands (`Command` objects) being the root, subcommands and options (`Subcommand` and `Option` objects) as the child, and so on as subcommands and options can be children of childrens. Subcommands can be executed by simply calling the name or an alias of the subcommand object, whilst options can only be executed by entering the required type of the option (NOTE: Entering incorrect type would throw an error to the user of the command).

To add subcommands and options, one can simply defined the `subcommands` and `options` fields with an array of subcommand or option objects. Below is an example of a command with subcommands and options.

<br>

_simple_tag.js_

```js
import { commands } from "./commands/index";

commands.register(
    {
        name: "tag",
        description: "Manages the tags of players",
        options: [
            {
                name: "player",
                description: "The player to manage the tags of",
                type: { type: "Player" },
                optional: false,
                subcommands: [
                    {
                        name: "add",
                        description: "Adds tags to the player",
                        options: [
                            {
                                name: "tag",
                                description: "The tag to be added",
                                type: { type: "string" }, // This is not required as "type" is set to type string by default
                                optional: false,
                            },
                        ],
                    },
                    {
                        name: "remove",
                        description: "Removes tags from the player",
                        options: [
                            {
                                name: "tag",
                                description: "The tag to be added",
                                optional: false,
                            },
                        ],
                    },
                    {
                        name: "list",
                        description: "Shows the list of tags that the player has",
                    },
                ],
            },
        ],
    },
    (interaction) => {
        // Retrieve the subcommand entered by the user with the depth of 2 (NOTE: "depth" utilizes the zero-based index indexing convention)
        // Retrieve the options by their types and names
        const subcommand = interaction.options.getSubcommand(2);
        const player = interaction.options.getPlayer("player");
        const tag = interaction.options.getString("tag");

        switch (subcommand) {
            case "add":
                interaction.reply(player.addTag(tag) ? `Added the tag "${tag}" to ${player.name}` : `Failed to add the tag "${tag}" to ${player.name}`);

                break;

            case "remove":
                interaction.reply(player.removeTag(tag) ? `Removed the tag "${tag}" from ${player.name}` : `Failed to remove the tag "${tag}" from ${player.name}`);

                break;

            case "list":
                const tags = player.getTags();
                interaction.reply(tags.length ? `${player.name}'s Tags:\n${tags.map((tag) => ` - ${tag}`).join("\n")}` : "No tags found");

                break;
        }
    }
);
```

<br>

### **OptionType**

There currently are 6 command option types, namely: `string`, `int`, `float`, `boolean`, `Player`, and `Coordinate`.

**String**

-   The `string` type only accepts strings, stringified non-string data types are not considered as a string. Example of stringified non-string data types are `"true"`, `".5"`, `"{}"`, `"124"`, etc. If `length` is specified, it will only accept string values with the length that is within the range of the provided length.

**Int**

-   The `int` type only accepts numbers with no floating point values, it also accepts stringified int data types. If `range` is specified, it will only accept the values within the range values.

**Float**

-   The `float` type accepts numbers even with floating point values, it also accepts stringified float data types. If `range` is specified, it will only accept values within the range values, and if `allowInt` is `true`, it will accept integer values or numbers with no floating point value.

**Boolean**

-   The `boolean` type only accepts the values `true` and `false`, it also accepts stringified boolean data types.

**Player**

-   The `Player` type accepts either an instance of the `Player` class. If `allowName` is `true`, it accepts player names as well, and if `allowId` is `true`, it accepts player IDs.

**Coordinate**

-   The `Coordinate` type accepts a number/coordinate point, or if `allowRelative` is `true`, accepts relative coordinates starting with "~".

<br>

### **Command Manager**

The command handler has a built-in command manager which is the `commands` object. The `commands` object has a built-in `help` command for users to utilize in order to retrieve information regarding the commands they need. The default command prefix of the command manager is `-` which can be changed by setting the `prefix` property of the manager.

```js
import { commands } from "./commands/index";

commands.prefix = "./"; // Changes the command prefix to "./"
```
