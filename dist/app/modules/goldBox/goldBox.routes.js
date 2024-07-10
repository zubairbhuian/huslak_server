"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const goldBox_controller_1 = require("./goldBox.controller");
const goldBox = express_1.default.Router();
goldBox.get("/", goldBox_controller_1.GoldBoxController.allGoldBox);
goldBox.post("/", goldBox_controller_1.GoldBoxController.createGoldBox);
goldBox.put("/", goldBox_controller_1.GoldBoxController.updateGoldBox);
goldBox.delete("/", goldBox_controller_1.GoldBoxController.deleteGoldBox);
exports.default = goldBox;
//# sourceMappingURL=goldBox.routes.js.map