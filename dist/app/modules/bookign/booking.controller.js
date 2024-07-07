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
exports.BookingController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const availability_sehema_1 = require("../availability/availability.sehema");
const user_model_1 = require("../users/user.model");
const booking_modal_1 = require("./booking.modal");
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, providerId, availabilityId, date } = req.body;
    if (userId === providerId) {
        throw new ApiErrors_1.default(400, 'User cannot book his/her own availability');
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(userId) || !mongoose_1.default.Types.ObjectId.isValid(providerId) || !mongoose_1.default.Types.ObjectId.isValid(availabilityId)) {
        throw new ApiErrors_1.default(400, 'Invalid user, provider, or availability ID');
    }
    const findUser = yield user_model_1.UserModel.findById(userId);
    if (!findUser) {
        throw new ApiErrors_1.default(404, 'User not found');
    }
    const availability = yield availability_sehema_1.AvailabilityModel.findOne({ _id: availabilityId, userId: providerId });
    if (!availability) {
        throw new ApiErrors_1.default(400, 'Provider is not available at the specified date and time');
    }
    const existingBooking = yield booking_modal_1.BookingModel.findOne({ userId, availabilityId });
    if (existingBooking) {
        throw new ApiErrors_1.default(400, 'You have already booked this availability');
    }
    // Create booking
    const booking = new booking_modal_1.BookingModel({
        userId,
        providerId,
        availabilityId,
        date,
        status: 'pending',
    });
    yield booking.save();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: 'Booking created successfully',
        data: booking,
    });
}));
// Update Booking
const updateBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { date, status } = req.body;
    // Validate ID
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid booking ID');
    }
    const booking = yield booking_modal_1.BookingModel.findByIdAndUpdate(id, {
        date,
        status,
    }, { new: true });
    if (!booking) {
        throw new ApiErrors_1.default(404, 'Booking not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Booking updated successfully',
        data: booking,
    });
}));
// Delete Booking
const deleteBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Validate ID
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid booking ID');
    }
    const booking = yield booking_modal_1.BookingModel.findByIdAndDelete(id);
    if (!booking) {
        throw new ApiErrors_1.default(404, 'Booking not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Booking deleted successfully',
        data: booking,
    });
}));
// Get User Bookings
const getUserBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { status } = req.query;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new ApiErrors_1.default(400, 'Invalid user ID');
    }
    // add status filter
    let filter;
    if (status) {
        filter = { userId, status };
    }
    else {
        filter = { userId };
    }
    const bookings = yield booking_modal_1.BookingModel.find(filter)
        .populate('userId', '-password')
        .populate('providerId', '-password')
        .populate('availabilityId');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'User bookings fetched successfully',
        data: bookings,
    });
}));
exports.BookingController = {
    createBooking,
    updateBooking,
    deleteBooking,
    getUserBookings,
};
//# sourceMappingURL=booking.controller.js.map