"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoldBoxModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const goldBoxSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    services: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
});
exports.GoldBoxModel = mongoose_1.default.model("GoldBox", goldBoxSchema);
//# sourceMappingURL=goldBox.model.js.map