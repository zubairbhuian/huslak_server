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
exports.CarRentalController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const file_uploadv2_1 = require("../../../utils/file_uploadv2");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const car_rental_modal_1 = __importDefault(require("./car-rental.modal"));
// ====== Get All Car Rentals =======
const getAllRentals = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const searchRegExp = new RegExp('.*' + search + '.*', 'i');
    const filter = {
        $or: [
            { make: { $regex: searchRegExp } },
            { model: { $regex: searchRegExp } },
            { location: { $regex: searchRegExp } },
            { phone: { $regex: searchRegExp } },
        ],
    };
    const count = yield car_rental_modal_1.default.find(filter).countDocuments();
    const rentals = yield car_rental_modal_1.default.find(filter)
        .limit(limit)
        .skip((page - 1) * limit);
    if (!rentals)
        throw new Error('Cannot get rentals');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Success',
        pagination: {
            page,
            limit,
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            prevousPage: page - 1 > 0 ? page - 1 : null,
            total: count,
        },
        data: rentals,
    });
}));
// ====== Create Car Rental =======
const createRental = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { make, model, year, seats, bags, pricePerDay, location, phone } = req.body;
    if (!req.file) {
        throw new ApiErrors_1.default(400, 'File is required');
    }
    const filename = req.file.filename;
    const imgPath = `/uploads/car-rental/${filename}`;
    const rental = yield car_rental_modal_1.default.create({
        make,
        model,
        year,
        seats,
        bags,
        location,
        phone,
        pricePerDay,
        img: imgPath,
    });
    if (!rental) {
        yield (0, file_uploadv2_1.deleteFile)(imgPath);
        throw new Error('Rental not created');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Rental added successfully',
        data: rental,
    });
}));
// ====== Update Car Rental =======
const updateRental = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const { make, model, year, seats, bags, pricePerDay, location, phone } = req.body;
    if (!id) {
        throw new ApiErrors_1.default(400, 'ID is required');
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid ID');
    }
    const currentRental = yield car_rental_modal_1.default.findById(id);
    if (req.file) {
        // Delete old file if it exists
        if (currentRental === null || currentRental === void 0 ? void 0 : currentRental.img) {
            yield (0, file_uploadv2_1.deleteFile)(currentRental.img);
        }
        const nameImg = req.file.filename;
        const newPath = `/uploads/car-rental/${nameImg}`;
        const updateData = {
            make, model, year, seats, bags, pricePerDay, location, phone, img: newPath
        };
        const updatedRental = yield car_rental_modal_1.default.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedRental) {
            throw new ApiErrors_1.default(404, 'Rental not found');
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Rental updated successfully',
            data: updatedRental,
        });
    }
    else {
        const updateData = { make, model, year, seats, bags, pricePerDay, location, phone };
        const updatedRental = yield car_rental_modal_1.default.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedRental) {
            throw new ApiErrors_1.default(404, 'Rental not found');
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Rental updated successfully',
            data: updatedRental,
        });
    }
}));
// ====== Delete Car Rental =======
const deleteRental = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id) {
        throw new ApiErrors_1.default(400, 'ID is required');
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid ID');
    }
    const deletedRental = yield car_rental_modal_1.default.findByIdAndDelete(id);
    if (!deletedRental) {
        throw new ApiErrors_1.default(404, 'Rental not found');
    }
    if (deletedRental.img) {
        yield (0, file_uploadv2_1.deleteFile)(deletedRental.img);
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Rental deleted successfully',
        data: deletedRental,
    });
}));
exports.CarRentalController = {
    getAllRentals,
    createRental,
    updateRental,
    deleteRental,
};
//# sourceMappingURL=car-rental.controller.js.map