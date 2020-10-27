"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBase = void 0;
class CommandBase {
    constructor(commandName) {
        this._commandName = commandName;
    }
    get CommandName() {
        return this._commandName;
    }
}
exports.CommandBase = CommandBase;
//# sourceMappingURL=CommandBase.js.map