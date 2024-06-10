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
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./logger");
const appConfig_1 = require("../config/appConfig");
// Connect to MongoDB using Mongoose
const connectToMongoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = appConfig_1.AppConfig.databaseUrl;
    try {
        if (!url) {
            logger_1.erLogger.error('MongoDB connection string not provided');
            return;
        }
        yield mongoose_1.default.connect(url).then(() => logger_1.logger.info('🔍 MongoDB connected'));
    }
    catch (error) {
        logger_1.erLogger.error(' MongoDB connection error:', error);
        process.exit(1);
    }
});
exports.default = connectToMongoDB;
//# sourceMappingURL=databaseMongoDb.js.map