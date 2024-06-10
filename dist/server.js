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
const app_1 = __importDefault(require("./app"));
const databaseMongoDb_1 = __importDefault(require("./utils/databaseMongoDb"));
const logger_1 = require("./utils/logger");
const appConfig_1 = require("./config/appConfig");
process.on('uncaughtException', err => {
    // eslint-disable-next-line no-console
    console.log('uncaughtException is detected ...');
    logger_1.erLogger.error(err);
    process.exit(1);
});
let server;
const connectServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const port = appConfig_1.AppConfig.port;
    try {
        if (!port) {
            logger_1.erLogger.error('Server connection failed: no port provided');
            return;
        }
        (0, databaseMongoDb_1.default)();
        server = app_1.default.listen(port, () => logger_1.logger.info(` 🔗 Server is running on port ${port}`));
    }
    catch (error) {
        logger_1.erLogger.error(`Error: ${error}`);
    }
    process.on('unhandledRejection', err => {
        // eslint-disable-next-line no-console
        console.log('unhandledRejection happened :( we are closing our server');
        logger_1.erLogger.error(err);
        if (server) {
            server.close(() => {
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
});
connectServer();
//# sourceMappingURL=server.js.map