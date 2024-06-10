"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const ApiErrors_1 = __importDefault(require("../../errors/ApiErrors"));
const appConfig_1 = require("../../config/appConfig");
const verifyToken = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!appConfig_1.AppConfig.isDevMode) {
        const token = req.headers['authorization'];
        if (!token) {
            throw new ApiErrors_1.default(403, 'Token not provided');
        }
        jsonwebtoken_1.default.verify(token, `${appConfig_1.AppConfig.jwtSecretKey}`, (err, decoded) => {
            if (err) {
                throw new ApiErrors_1.default(400, 'Invalid token');
            }
            req.userId = decoded.userId;
            next();
        });
    }
    next();
}));
exports.default = verifyToken;
//# sourceMappingURL=verify_token_middleware.js.map