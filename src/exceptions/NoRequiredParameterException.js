"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoRequiredParameterException = void 0;
const BotException_1 = require("./BotException");
class NoRequiredParameterException extends BotException_1.BotException {
    constructor() {
        super();
        this.Message = "NO REQUIRED PARAMETER";
    }
    Handle(msg) {
        super.Handle(msg);
    }
}
exports.NoRequiredParameterException = NoRequiredParameterException;
//# sourceMappingURL=NoRequiredParameterException.js.map