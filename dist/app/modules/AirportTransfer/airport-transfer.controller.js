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
exports.AirportTransferController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const file_uploadv2_1 = require("../../../utils/file_uploadv2");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const airport_transfer_modal_1 = __importDefault(require("./airport-transfer.modal"));
// ====== Get All Airport Transfers =======
const getAllTransfers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const searchRegExp = new RegExp('.*' + search + '.*', 'i');
    const filter = {
        $or: [
            { make: { $regex: searchRegExp } },
            { model: { $regex: searchRegExp } },
            { name: { $regex: searchRegExp } },
            { location: { $regex: searchRegExp } },
            { phone: { $regex: searchRegExp } },
        ],
    };
    const count = yield airport_transfer_modal_1.default.find(filter).countDocuments();
    const transfers = yield airport_transfer_modal_1.default.find(filter)
        .limit(limit)
        .skip((page - 1) * limit);
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
        data: transfers,
    });
}));
// ====== Create Airport Transfer =======
const createTransfer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        throw new ApiErrors_1.default(400, 'File is required');
    }
    const filename = req.file.filename;
    const imgPath = `/uploads/airport-transfer/${filename}`;
    const { make, model, year, driverName, description, phone, rate, location } = req.body;
    const transfer = yield airport_transfer_modal_1.default.create({
        make,
        model,
        year,
        driverName,
        description,
        phone,
        rate,
        location,
        img: imgPath,
    });
    if (!transfer) {
        yield (0, file_uploadv2_1.deleteFile)(imgPath);
        throw new Error('Transfer not created');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Transfer added successfully',
        data: transfer,
    });
}));
// ====== Update Airport Transfer =======
const updateTransfer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const { make, model, year, driverName, description, phone, rate, location } = req.body;
    if (!id) {
        throw new ApiErrors_1.default(400, 'ID is required');
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid ID');
    }
    let imgPath;
    if (req.file) {
        const newFilename = req.file.filename;
        imgPath = `/uploads/airport-transfer/${newFilename}`;
    }
    const updateData = { make, model, year, driverName, description, phone, rate, location };
    if (imgPath) {
        const oldData = yield airport_transfer_modal_1.default.findById(id);
        if (oldData === null || oldData === void 0 ? void 0 : oldData.img) {
            yield (0, file_uploadv2_1.deleteFile)(oldData.img);
        }
        updateData.img = imgPath;
    }
    const updatedTransfer = yield airport_transfer_modal_1.default.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTransfer) {
        throw new ApiErrors_1.default(404, 'Transfer not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Transfer updated successfully',
        data: updatedTransfer,
    });
}));
// ====== Delete Airport Transfer =======
const deleteTransfer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id) {
        throw new ApiErrors_1.default(400, 'ID is required');
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid ID');
    }
    const transfer = yield airport_transfer_modal_1.default.findById(id);
    if (!transfer) {
        throw new ApiErrors_1.default(404, 'Transfer not found');
    }
    if (transfer.img) {
        yield (0, file_uploadv2_1.deleteFile)(transfer.img);
    }
    const deletedTransfer = yield airport_transfer_modal_1.default.findByIdAndDelete(id);
    if (!deletedTransfer) {
        throw new ApiErrors_1.default(404, 'Transfer not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Transfer deleted successfully',
        data: deletedTransfer,
    });
}));
exports.AirportTransferController = {
    getAllTransfers,
    createTransfer,
    updateTransfer,
    deleteTransfer,
};
//# sourceMappingURL=airport-transfer.controller.js.map