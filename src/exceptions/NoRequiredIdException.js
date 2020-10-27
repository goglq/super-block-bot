"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoRequiredIdException = void 0;
const BotException_1 = require("./BotException");
class NoRequiredIdException extends BotException_1.BotException {
    constructor() {
        super();
        this.Message = 'NO REQUIRED ID OF CATEGORY OR CHANNEL';
    }
    Handle(msg) {
        super.Handle(msg);
    }
}
exports.NoRequiredIdException = NoRequiredIdException;
//# sourceMappingURL=NoRequiredIdException.js.map