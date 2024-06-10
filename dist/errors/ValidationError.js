"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        return {
            path: el.path,
            message: el.message,
        };
    });
    return {
        statusCode: 400,
        message: 'something is not right',
        errorMessages: errors,
    };
};
exports.default = ValidationError;
//# sourceMappingURL=ValidationError.js.map