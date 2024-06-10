"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pikes = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.default = pikes;
//# sourceMappingURL=pikes.js.map