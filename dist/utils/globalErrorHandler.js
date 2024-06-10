"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiErrors_1 = __importDefault(require("../errors/ApiErrors"));
const ValidationError_1 = __importDefault(require("../errors/ValidationError"));
const castError_1 = __importDefault(require("../errors/castError"));
const logger_1 = require("./logger");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorsHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = 'something is not right';
    let errorMessages = [];
    if (error.name === 'ValidationError') {
        const structureError = (0, ValidationError_1.default)(error);
        statusCode = structureError.statusCode;
        message = structureError.message;
        errorMessages = structureError.errorMessages;
    }
    else if ((error === null || error === void 0 ? void 0 : error.name) === "CastError") {
        const structureError = (0, castError_1.default)(error);
        statusCode = structureError.statusCode;
        message = structureError.message;
        errorMessages = structureError.errorMessages;
    }
    else if (error instanceof ApiErrors_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.status;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error.message,
                },
            ]
            : [];
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error.message,
                },
            ]
            : [];
    }
    logger_1.erLogger.error(error.message);
    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: error.stack,
    });
};
exports.default = globalErrorsHandler;
//# sourceMappingURL=globalErrorHandler.js.map