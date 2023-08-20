# **Command Handler**

A command handler which manages the creation and execution of custom commands with the utilization of the Scripting-API of Minecraft Bedrock Edition. This command handler allows the execution of commands with dynamic arrangements of subcommands and options.

### **Getting Started**

To create a custom command, the `commands` object must be imported from `/commands/index` (inside of the `scripts` directory). The `commands` object is an instance of the `CommandManager` class which manages commands and handles their creation and execution. The `register()` method must be called with the command options as the argument provided.

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

To add subcommands and options, one can simply define the `subcommands` and `options` fields with an array of subcommand or option objects. Below is an example of a command with subcommands and options.

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
                                type: { type: "string", length: [1, 255] },
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
                                type: { type: "string", length: [1, 255] },
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

-   The `string` type only accepts strings. Stringified non-string data types are not considered as values of type string. Example of stringified non-string data types are `"true"`, `".5"`, `"{}"`, `"124"`, `"3.14"`, etc. If `length` is specified, it will only accept string values with the length that is within the range of the provided length.
    > NOTE: Since `ChatSendBeforeEvent.message` is of type string, every argument entered will be either a string or a stringified non-string data type (even without quotation marks). Entering non-string data types to the chat input surrounded by quotation marks converts them to a string.

**Int**

-   The `int` type only accepts numbers with no floating point values. If `range` is specified, it will only accept the values within the range values. (Applies to stringified int data types)

**Float**

-   The `float` type accepts numbers with floating point values. If `range` is specified, it will only accept values within the range values, and if `allowInt` is `true`, it will accept integer values or numbers with no floating point value. (Applies to stringified float data types)
    > NOTE: Setting `allowInt` to `false` will cause the option to throw a command syntax error to the user if the numerical value provided is considered an integer.

**Boolean**

-   The `boolean` type only accepts the values `true` and `false`. (Applies to stringified boolean data types)

**Player**

-   The `Player` type has two type options, `allowName` and `allowId`. The type accepts player names if the option `allowName` is set to `true`, and the same goes for player IDs if `allowId` is set to `true`.
    > NOTE: Setting both `allowName` and `allowId` to `false` may result to a technically unusable option or an option where a user can not enter a player value.

**Coordinate**

-   The `Coordinate` type accepts a number/coordinate point. It will accept relative coordinates starting with "~" if the option `allowRelative` is set to `true`.
    > NOTE: `Coordinate` type only supports relative coordinates as coordinates with "^" may require a 3D vector (or a total of 3 `Coordinate` command options) in order to calculate the offset.

<br>

### **Command Manager**

The command handler has a built-in command manager which is the `commands` object and has a built-in `help` command for users to utilize in order to retrieve information regarding the commands they need. The default command prefix of the command manager is `-` which can be changed by setting the `prefix` property of the manager.

```js
import { commands } from "./commands/index";

// Change the command prefix to "./"
// NOTE: The prefix can only be a string, setting to a value that is not of type string will throw an error
commands.prefix = "./";
```
