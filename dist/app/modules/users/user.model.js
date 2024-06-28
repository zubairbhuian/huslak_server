"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.UserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importStar(require("mongoose"));
const languageSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    img: { type: String, required: true }
});
const doctorSpecialistSchema = new mongoose_1.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
});
const availabilitySchema = new mongoose_1.Schema({
    dayName: { type: String, required: true },
    availableTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
});
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'User Name is missing'],
        default: ''
    },
    email: {
        type: String,
        required: [true, 'User email is missing'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: [true, 'User phone is missing'],
        trim: true,
        default: ''
    },
    userType: {
        type: String,
        enum: ['doctor', 'user', "translator", "carer"],
        required: [true, 'User type is missing'],
        trim: true,
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        trim: true,
        default: ''
    },
    password: {
        type: String,
        required: [true, 'User password is missing'],
        minlength: [6, 'User password should be at least 6 characters'],
        set: (value) => bcrypt_1.default.hashSync(value, bcrypt_1.default.genSaltSync(10)),
    },
    img: {
        type: String,
        default: '/default/users/default_user.png'
    },
    price: {
        type: String,
        trim: true,
        default: ''
    },
    discretion: {
        type: String,
        trim: true,
        default: ''
    },
    cityId: {
        type: String,
        trim: true,
        default: ''
    },
    nearHospitalId: {
        type: String,
        trim: true,
        default: ''
    },
    languages: [languageSchema],
    doctorSpecialist: [doctorSpecialistSchema],
    availability: [availabilitySchema]
}, { timestamps: true });
userSchema.methods.comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(candidatePassword, this.password);
    });
};
exports.UserModel = mongoose_1.default.model('huslak-app-users', userSchema);
//# sourceMappingURL=user.model.js.map