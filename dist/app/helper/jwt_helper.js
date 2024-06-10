"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTHelper = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appConfig_1 = require("../../config/appConfig");
const generateToken = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, `${appConfig_1.AppConfig.jwtSecretKey}`, { expiresIn: appConfig_1.AppConfig.tokenExpiresIn });
};
exports.JWTHelper = { generateToken };
//# sourceMappingURL=jwt_helper.js.map