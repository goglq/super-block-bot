"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
class Bot {
    constructor() {
        this._client = new discord_js_1.Client();
        const { prefix, token } = require('../botconfig.json');
        this._token = token;
        this._prefix = prefix;
        this._client.on('message', this.onMessageRecieved);
    }
    start() {
        this._client.login(this._token)
            .then(bot => console.log(`Successfully logged in as ${bot}`))
            .catch(console.error);
    }
    onMessageRecieved(msg) {
        if (!msg.content.startsWith(this._prefix) || msg.author.bot)
            return;
        const args = msg.content.slice(this._prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
    }
}
exports.Bot = Bot;
//# sourceMappingURL=main.js.map