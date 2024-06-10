"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isDevMode = true;
const port = process.env.PORT;
const databaseUrl = process.env.database_url;
const defaultPassword = process.env.DEFAULT_STUDENT_PASSWORD;
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const tokenExpiresIn = process.env.TOKEN_EXPIRES_IN;
exports.AppConfig = {
    isDevMode, port, databaseUrl, defaultPassword, jwtSecretKey, tokenExpiresIn
};
//# sourceMappingURL=appConfig.js.map