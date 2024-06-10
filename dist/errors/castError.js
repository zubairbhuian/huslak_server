"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const castError = (error) => {
    const err = [
        {
            path: error.path,
            message: "invalid ID"
        }
    ];
    return {
        statusCode: 400,
        message: 'cast error',
        errorMessages: err,
    };
};
exports.default = castError;
//# sourceMappingURL=castError.js.map