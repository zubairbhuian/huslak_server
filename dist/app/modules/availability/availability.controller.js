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
exports.ScheduleController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const user_model_1 = require("../users/user.model");
const availability_sehema_1 = require("./availability.sehema");
// Add Availability
const addAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, dayName, availableTime, isAvailable } = req.body;
    // Check if userId is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new ApiErrors_1.default(400, 'Invalid user ID');
    }
    const User = yield user_model_1.UserModel.findById(userId);
    if (!User) {
        throw new ApiErrors_1.default(404, 'User not found');
    }
    if (User.userType === 'user') {
        throw new ApiErrors_1.default(400, 'User cannot add availability');
    }
    const existingAvailability = yield availability_sehema_1.AvailabilityModel.findOne({ userId, dayName });
    if (existingAvailability) {
        throw new ApiErrors_1.default(400, 'Availability for this day already exists for the user');
    }
    const availability = new availability_sehema_1.AvailabilityModel({
        userId,
        dayName,
        availableTime,
        isAvailable,
    });
    yield availability.save();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Availability added successfully',
        data: availability,
    });
}));
// Update Availability
const updateAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { dayName, availableTime, isAvailable } = req.body;
    // Check if id is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid availability ID');
    }
    const availability = yield availability_sehema_1.AvailabilityModel.findByIdAndUpdate(id, {
        dayName,
        availableTime,
        isAvailable,
    }, { new: true });
    if (!availability) {
        throw new ApiErrors_1.default(404, 'Availability not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Availability updated successfully',
        data: availability,
    });
}));
// Delete Availability
const deleteAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid availability ID');
    }
    const availability = yield availability_sehema_1.AvailabilityModel.findByIdAndDelete(id);
    if (!availability) {
        throw new ApiErrors_1.default(404, 'Availability not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Availability deleted successfully',
        data: availability,
    });
}));
// Get User Availability
const getUserAvailability = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new ApiErrors_1.default(400, 'Invalid user ID');
    }
    const availabilities = yield availability_sehema_1.AvailabilityModel.find({ userId }).populate('userId');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User availability fetched successfully',
        data: availabilities,
    });
}));
exports.ScheduleController = {
    addAvailability,
    updateAvailability,
    deleteAvailability,
    getUserAvailability,
};
//# sourceMappingURL=availability.controller.js.map