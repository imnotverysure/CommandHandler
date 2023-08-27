import{system as t,Player as e,world as n}from"@minecraft/server";function defer(e,n,s){t.runTimeout(()=>n(e),s)}function S(t,e){return`${_S(t)}${String(e).replaceAll(_S("r"),`${_S("r")}${_S(t)}`)}${_S("r")}`}function _S(t){return`§${t}`}function isString(t){try{return isNaN(t)&&"string"==typeof JSON.parse(t)}catch{return"string"==typeof t}}function isInt(t){return Number.isInteger(Number(t))}function isFloat(t){return!isNaN(t)}function isBoolean(t){try{return"boolean"==typeof JSON.parse(t)}catch{return"boolean"==typeof t}}function isPlayer(t){return t instanceof e||!!n.getPlayers().find(e=>e.name.toLowerCase()===t.toLowerCase()||e.id===t)}function isCoordinate(t,e=!0){return isFloat(t)||e&&isFloat(t.replace(/^~/,"")||0)}const s=console.warn;globalThis.console={...console,warn(...t){s(`${_S("6")}`,...t)},log(...t){s(`${_S("b")}`,...t)},error(...t){s(`${_S("c")}`,...t)}};class Data{depth;name;aliases;permission;description;subcommands;options;constructor(t){this.depth=t.depth??0,this.name=t.name,this.aliases=t.aliases??[],this.permission=t.permission??(t=>t.isValid()),this.description=t.description??"No description",this.subcommands=this.convertSubcommands(t.subcommands??[]),this.options=this.convertOptions(t.options??[])}isKey(t,e=!1){return this.keys().map(t=>e?t:t.toLowerCase()).includes(e?t:t.toLowerCase())}keys(){return[this.name,...this.aliases]}getRoute(t){const find=(e=t,n=!1)=>this.getRoutes(this).find(e=>t.every((s,i)=>{const a=e[i];return a&&(a.isKey(s,!1===n?i!==t.length-1:n)||"Option"===a.constructor.name&&a.type.verify(s))}));return(find(t,!0)??find(t))||this.getRoute(t.slice(0,-1))}getRoutes(t=this){const e=this.getAllSubbranches(t);return e.length?e:[[t]]}getSubbranches(t=this){return[...t.subcommands,...t.options]}getAllSubbranches(t=this){return[...t.options,...t.subcommands].map(t=>{const e=this.getAllSubbranches(t);return e.length?e:e.concat([t])}).flat().map(e=>[t].concat(e))}generateRawUsages(){return this.getRoutes().map(t=>[this.name,...this.aliases].map(e=>t.map(t=>{if("Command"===t.constructor.name)return{permission:t.permission,usage:e};const n="optional"in t?t.optional?["[","]"]:["<",">"]:["",""];return{permission:t.permission,usage:`${n[0]}${[t.name,...t.aliases].join("|")}${"type"in t?`: ${t.type.name}`:""}${n[1]}`}}))).flat()}generateUsages(t){const e=this.generateRawUsages().filter(e=>e.every(e=>e.permission(t)));return e.length?e:this.getSubbranches().filter(e=>e.permission(t))?[[{permission:this.permission,usage:this.name}]]:[[{permission:this.permission,usage:"No usages found"}]]}convertSubcommands(t,e){return(t=>t.map(t=>({...t,depth:this.depth+1})).map(t=>e?new e(t):t))(t)}convertOptions(t,e){return(t=>t.map(t=>({...t,depth:this.depth+1})).map(t=>e?new e(t):t))(t)}}class OptionType{name;_data;_options;constructor(t,e){this._data=t,this._options=e}get options(){return this._options}verify(t){return!!t}validate(t){return{valid:!!t,message:t?void 0:t}}parse(t){return t}}const InvalidStringType_NonString=()=>"",InvalidStringType_InvalidLength=(t,e)=>S("c",`The string must have at least ${S("f",e[0])} characters and ${S("f",e[1])} at most [${S("f",t.name)}]`);const InvalidIntType_NonInt=()=>"",InvalidIntType_OutOfRange=(t,e)=>S("c",`The int value must be at least ${S("f",e[0])} and ${S("f",e[1])} at most [${S("f",t.name)}]`);const InvalidFloatType_NonFloat=()=>"",InvalidFloatType_OutOfRange=(t,e)=>S("c",`The int value must be at least ${S("f",e[0])} and ${S("f",e[1])} at most [${S("f",t.name)}]`),InvalidFloatType_NoIntAllowed=t=>S("c",`You can't use values that are considered as ${S("f","INT")} in this case [${S("f",t.name)}]`);const InvalidBooleanType_NonBoolean=()=>"";const InvalidPlayerType_NonPlayer=()=>"",InvalidPlayerType_NoPlayerIdAllowed=t=>S("c",`You can't use values that are considered as ${S("f","PLAYER IDS")} in this case [${S("f",t.name)}]`),InvalidPlayerType_NoPlayerNameAllowed=t=>S("c",`You can't use values that are considered as ${S("f","PLAYER NAMES")} in this case [${S("f",t.name)}]`);const InvalidCoordinateType_NonCoordinate=()=>"",InvalidCoordinateType_NoRelativeCoordinateAllowed=t=>S("c",`You can't use values that are considered as ${S("f","RELATIVE COORDINATES")} in this case [${S("f",t.name)}]`);const i={string:class extends OptionType{name="string";_options={type:this._options.type,length:(this._options.length??[0,1/0]).sort((t,e)=>t-e)};getMatches(t){const e=String(t).replace(/^"(.*)"$/,"$1");return{isString:isString(e),isValidLength:e.length>=this._options.length[0]&&e.length<=this._options.length[1]}}verify(t){return this.validate(t).valid}validate(t){const e=this.getMatches(t);return e.isString?{valid:e.isValidLength,message:InvalidStringType_InvalidLength(this._data,this._options.length)}:{valid:!1,message:InvalidStringType_NonString()}}parse(t){return String(t).slice(0,this._options.length?.[1]??1/0)}},int:class extends OptionType{name="int";_options={type:this._options.type,range:(this._options.range??[-1/0,1/0]).sort((t,e)=>t-e)};getMatches(t){return{isInt:isInt(t),isWithinRange:t>=this._options.range[0]&&t<=this._options.range[1]}}verify(t){return this.validate(t).valid}validate(t){const e=this.getMatches(t);return e.isInt?e.isWithinRange?{valid:!0,message:" "}:{valid:e.isWithinRange,message:InvalidIntType_OutOfRange(this._data,this._options.range)}:{valid:!1,message:InvalidIntType_NonInt()}}parse(t){return parseInt(t)}},float:class extends OptionType{name="float";_options={type:this._options.type,allowInt:this._options.allowInt??!0,range:(this._options.range??[-1/0,1/0]).sort((t,e)=>t-e)};getMatches(t){return{isFloat:isFloat(t),isWithinRange:t>=this._options.range[0]&&t<=this._options.range[1],isNonFloat:isInt(t)}}verify(t){return this.validate(t).valid}validate(t){const e=this._options,n=this.getMatches(t);return n.isFloat?n.isWithinRange?!e.allowInt&&n.isNonFloat?{valid:!1,message:InvalidFloatType_NoIntAllowed(this._data)}:{valid:!0,message:""}:{valid:!1,message:InvalidFloatType_OutOfRange(this._data,e.range)}:{valid:!1,message:InvalidFloatType_NonFloat()}}parse(t){return parseFloat(t)}},boolean:class extends OptionType{name="boolean";_options={...this._options};verify(t){return this.validate(t).valid}validate(t){return{valid:isBoolean(t),message:InvalidBooleanType_NonBoolean()}}parse(t){try{return isBoolean(t)&&"string"==typeof t&&!!JSON.parse(t)}catch{return!!t}}},Player:class extends OptionType{name="Player";_options={type:this._options.type,allowName:this._options.allowName??!0,allowId:this._options.allowId};getMatches(t){return{isPlayer:isPlayer(t),isPlayerId:!!n.getPlayers().find(e=>e.id===t),isPlayerName:!!n.getPlayers({name:t})[0]}}verify(t){return this.validate(t).valid}validate(t){const e=this._options,n=this.getMatches(t);return n.isPlayer?!e.allowId&&n.isPlayerId?{valid:!1,message:InvalidPlayerType_NoPlayerIdAllowed(this._data)}:!e.allowName&&n.isPlayerName?{valid:!1,message:InvalidPlayerType_NoPlayerNameAllowed(this._data)}:{valid:!0,message:""}:{valid:!1,message:InvalidPlayerType_NonPlayer()}}parse(t){const s=this._options;return t instanceof e?t:s.allowName?n.getPlayers({name:t})[0]:s.allowId?n.getPlayers().find(e=>e.id===t):t}},Coordinate:class extends OptionType{name="Coordinate";_options={type:this._options.type,allowRelative:this._options.allowRelative??!0};getMatches(t){return{isCoordinate:isCoordinate(t,this._options.allowRelative),isRelativeCoordinate:isString(t)&&isFloat(t.replace(/^~/,"")||0)}}verify(t){return this.validate(t).valid}validate(t){const e=this.getMatches(t);return e.isCoordinate?!this._options.allowRelative&&e.isRelativeCoordinate?{valid:!1,message:InvalidCoordinateType_NoRelativeCoordinateAllowed(this._data)}:{valid:!0,message:""}:{valid:!1,message:InvalidCoordinateType_NonCoordinate()}}parse(t,e){return(isString(t)&&/^~/.test(t)?Number(t)+(e??0):NaN)||(isFloat(t)?Number(t):NaN)}}};class Option extends Data{type;optional;constructor(t){super(t),this.type=t.type&&t.type.type?new i[t.type.type](this,t.type):new i.string(this,{type:"string"}),this.optional=t.optional??!0}convertSubcommands(t){return super.convertSubcommands(t,Subcommand)}convertOptions(t,e){return super.convertOptions(t,Option)}}class Subcommand extends Data{constructor(t){super(t)}convertSubcommands(t){return super.convertSubcommands(t,Subcommand)}convertOptions(t,e){return super.convertOptions(t,Option)}}class Command extends Data{callback;constructor(t){super(t),this.callback=t.callback??(t=>t)}convertSubcommands(t){return super.convertSubcommands(t,Subcommand)}convertOptions(t,e){return super.convertOptions(t,Option)}}var a;function respond(t,e){const n={[a.InvalidCommand]:e=>invalidCommand(t,e.data[0]),[a.InvalidExecutionPermission]:e=>function(t,e){invalidCommand(t,e)}(t,e.data[0]),[a.InvalidArgument]:e=>function(t,e="",n,s=""){const{interactionString:i}=t,a=([...i].map((t,e)=>" "===t?e:void 0).filter(t=>void 0!==t).find((t,e)=>e===(n?.depth??0)-1)??i.length)+1;t.reply(S("c",`Unexpected argument: "${e}" at 1:${a+1}: "${i.slice(0,a)}>>${e}<<${i.slice(a+e.length)}"${s.length?`. ${s}`:""}`))}(t,...e.data.slice(0,3))};n[e.code]?.(e)}function invalidCommand(t,e){t.reply(S("c",`Unknown command: ${S("f",e??t.arguments[0])}. Please check whether the command exists and that you have permission to use it`))}!function(t){t[t.InvalidCommand=520]="InvalidCommand",t[t.InvalidExecutionPermission=521]="InvalidExecutionPermission",t[t.InvalidArgument=522]="InvalidArgument"}(a||(a={}));class InteractionOptionResolver{_data=[];_interaction;_root;_feedback={code:null,data:[]};constructor(t){this._interaction=t,this._root=this._interaction.manager.retrieve(t.arguments[0]),this.resolve()}resolve(){if(!this._interaction.isCommand())return;if(!this._root)return void(this.feedback.code=a.InvalidCommand);const t=this.modify(this._interaction.arguments);for(const e of this._root.getRoute(t).slice(0,t.length)){const n=t[e.depth];if(!e.permission(this._interaction.sender))return void(this._feedback=this._root===e?{...this.feedback,code:a.InvalidExecutionPermission}:{code:a.InvalidArgument,data:[n]});const s=e instanceof Option?e.type.validate(n.replace(/^"(.*)"$/,"$1")):void 0;if(s&&!s.valid)return void(this._feedback={code:a.InvalidArgument,data:[n,e,s.message]})}const e=this.trace();if(e[e.length-1].getSubbranches().filter(t=>(!("optional"in t)||!t.optional)&&t.permission(this._interaction.sender)).length)this._feedback={code:a.InvalidArgument,data:[]};else for(let n=0,s=t[n];n<t.length;n++,s=t[n]){const t=e[n];t&&this._data.push({name:t.name,depth:n,value:s.replace(/^"(.*)"$/,"$1"),type:t instanceof Option?t.type:void 0,dataType:t.constructor.name})}}modify(t,e=this._root.getRoute(t)){return t.map((t,n,s)=>{const i=e[e.length-1];return n===e.length-1&&i instanceof Option&&"string"===i.type.name?this._interaction.interactionString.slice(s.map((t,e)=>e<n?t.length:0).reduce((t,e)=>t+e)+n+this._interaction.manager.prefix.length).trim():t}).slice(0,e.length)}trace(t=this.modify(this._interaction.arguments)){const e=[];for(const n of this._root.getRoute(t).slice(0,t.length)){const s=t[n.depth];if(!s||!(n.isKey(s)||n instanceof Option&&n.type.verify(s)))return e;e.push(n)}return e}get feedback(){return this._feedback}getCommand(){return this._root.name}getSubcommand(t){return this._data.find(e=>"Subcommand"===e.dataType&&(e.name===t||e.depth===t))?.name}getOptionData(t,e,n=!0){const s=this._data.find(n=>"Option"===n.dataType&&n.name===t&&n.type.name===e);return{...s,value:n?s&&s.type.parse(s.value):s&&s.value}}getOption(t,e){return this.getOptionData(t,e,!0).value}getString(t){return this.getOption(t,"string")}getInt(t){return this.getOption(t,"int")}getFloat(t){return this.getOption(t,"float")}getBoolean(t){return this.getOption(t,"boolean")}getPlayer(t){return this.getOption(t,"Player")}getCoordinate(t,e){const n=this.getOptionData(t,"Coordinate",!1);return n.type.parse(n.value,this._interaction.sender.location[e])}getCoordinateX(t){return this.getCoordinate(t,"x")}getCoordinateY(t){return this.getCoordinate(t,"y")}getCoordinateZ(t){return this.getCoordinate(t,"z")}}class Interaction{_sender;_interactionString;_manager;_options;_arguments=[];constructor(t,e,n){this._sender=t,this._interactionString=n,this._manager=e,this._arguments=n.slice(e.prefix.length).match(/[^\s"]+|"[^"]+"/g)?.flatMap(t=>/^~/.test(t)&&!t.includes('"')?t.split(/(^~(-?\d*\.?\d+)?)/).filter(t=>/^~(-?\d*\.?\d+)?/.test(t)):t)??this._arguments,this._options=new InteractionOptionResolver(this),this.execute()}get sender(){return this._sender}get interactionString(){return this._interactionString}get manager(){return this._manager}get options(){return this._options}get arguments(){return this._arguments}isCommand(){return!!this.arguments[0]&&this._interactionString.startsWith(this._manager.prefix)}reply(t,e=!0){try{e?this._sender.sendMessage(t):n.sendMessage(t)}catch{this._sender.sendMessage(S("c","An error occurred"))}}execute(){this.isCommand()&&respond(this,this._manager.execute(this.arguments[0],this))}}class CommandManager{#t=[];_prefix="-";constructor(){this.defaultCommands(),this.onChatCommand()}get prefix(){return this._prefix}set prefix(t){if("string"!=typeof t)throw new TypeError(`[${this.constructor.name}] "prefix" must be of type string`);this._prefix=t}register(t,e){const n=new Command({...t,callback:e}),s=n.keys().find(t=>!!this.retrieve(t));if(s)throw new Error(`[${this.constructor.name}] A command with the key "${s}" already exists`);this.#t.push(n)}delete(t){const e=this.#t.length;return this.#t=this.#t.filter(e=>!e.isKey(t)),e!==this.#t.length}overwrite(t,e={}){const n=this.retrieve(t);n&&this.delete(t)&&this.register({...n,...e},e.callback??n.callback)}execute(t,e){const n=this.retrieve(t);return e.options.feedback.code||n?.callback(e),e.options.feedback}retrieve(t){return this.#t.find(e=>e.isKey(t))}retrieveCommands(){return Object.freeze(this.#t)}defaultCommands(){this.register({name:"help",aliases:["?"],description:"Shows available informations regarding commands",options:[{name:"page",description:"The page of the command list to show",type:{type:"int",range:[1,1/0]}},{name:"command",description:"The command that will have its avaiable information shown"}]},t=>{const e=this.retrieveCommands().filter(e=>e.permission(t.sender)),n=Math.ceil(e.length/8),s=t.options.getInt("page")??1,i=s<1?1:s>n?n:s,a=t.options.getString("command"),o=e.find(t=>t.isKey(a??""));if(!a)return t.reply(S("f",`${S("l",S("b",`Commands [Page ${i} / ${n}]`))}\n${e.slice(e.length*(i-1),e.length*(i-1)+8).map(t=>` ${S("f",`${this.prefix}${t.name} ${S("o",`- ${t.description}`)}`)}`).join("\n")}`));if(!o)return invalidCommand(t,a);const r=o.generateUsages(t.sender).map(t=>t.map(t=>t.usage).join(" "));return t.reply(S("f",`${S("l",S("b","Command Information"))}\n ${S("b",`${this.prefix}${o.name} ${o.aliases.length?`[${o.aliases.join(" | ")}]`:""}`)}\n  - ${S("o",o.description)}\n\n${S("b",S("l","Command Usages:"))}\n${r.map(t=>`  ${this.prefix}${t}`).join("\n")}`))})}onChatCommand(){n.beforeEvents.chatSend.subscribe(t=>{t.cancel=!0,defer(t,t=>{const e=new Interaction(t.sender,this,t.message);e.isCommand()||e.reply(`<${t.sender.name}> ${t.message}`,!1)})})}}const o=new CommandManager;export{CommandManager,S,_S,o as commands,defer,isBoolean,isCoordinate,isFloat,isInt,isPlayer,isString};
