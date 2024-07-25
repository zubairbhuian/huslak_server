"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATMModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const atmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is missing'],
        trim: true, // empty space remove
        maxlength: [150, 'Name should be under 150 characters'],
    },
    address: {
        type: String,
        required: [true, 'Address is missing'],
        trim: true,
    },
    distance: {
        type: String,
        required: [true, 'Distance is missing'],
        trim: true,
    },
    goOn: {
        type: String,
        required: [true, 'Go-on is missing'],
        trim: true,
    },
    cityId: {
        type: String,
        required: [true, 'cityId is missing'],
        trim: true,
    },
    nearHospitalId: {
        type: String,
        required: [true, 'Near hospital is missing'],
        trim: true,
    },
    img: {
        type: String,
        default: ''
    },
}, {
    timestamps: true // when this data is created or updated
});
exports.ATMModel = mongoose_1.default.model('atm', atmSchema);
//# sourceMappingURL=atm.model.js.map