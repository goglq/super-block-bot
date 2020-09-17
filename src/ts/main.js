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
    }
    start() {
        this._client.login();
    }
}
exports.Bot = Bot;
//# sourceMappingURL=main.js.map