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
exports.GoldBoxController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const goldBox_model_1 = require("./goldBox.model");
// Get all Gold Box records
const allGoldBox = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
        $or: [
            { name: { $regex: searchRegExp } },
            { phoneNumber: { $regex: searchRegExp } },
            { emailId: { $regex: searchRegExp } },
        ],
    };
    const count = yield goldBox_model_1.GoldBoxModel.find(filter).countDocuments();
    const records = yield goldBox_model_1.GoldBoxModel.find(filter)
        .limit(limit)
        .skip((page - 1) * limit);
    if (!records)
        throw new Error('Cannot get records');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Success',
        pagination: {
            page: page,
            limit: limit,
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            prevousPage: page - 1 > 0 ? page - 1 : null,
            total: Math.ceil(count / limit),
        },
        data: records,
    });
    next();
}));
// Create a new Gold Box record
const createGoldBox = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phoneNumber, emailId, services, description } = req.body;
    try {
        const data = yield goldBox_model_1.GoldBoxModel.create({
            name,
            phoneNumber,
            emailId,
            services,
            description,
        });
        if (!data)
            throw new Error('Not created');
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Added successfully',
            data: data,
        });
        next();
    }
    catch (error) {
        next(error);
    }
}));
// Update a Gold Box record
const updateGoldBox = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const { name, phoneNumber, emailId, services, description } = req.body;
    if (!id)
        throw new ApiErrors_1.default(400, 'ID is required');
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new ApiErrors_1.default(400, 'Invalid ID');
    const updatedData = yield goldBox_model_1.GoldBoxModel.findByIdAndUpdate(id, { name, phoneNumber, emailId, services, description }, { new: true });
    if (!updatedData)
        throw new ApiErrors_1.default(404, 'Data not found');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Updated successfully',
        data: updatedData,
    });
    next();
}));
// Delete a Gold Box record
const deleteGoldBox = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id)
        throw new ApiErrors_1.default(400, 'ID is required');
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new ApiErrors_1.default(400, 'Invalid ID');
    const deletedData = yield goldBox_model_1.GoldBoxModel.findByIdAndDelete(id);
    if (!deletedData)
        throw new ApiErrors_1.default(404, 'Data not found');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Deleted successfully',
        data: deletedData,
    });
    next();
}));
exports.GoldBoxController = {
    allGoldBox,
    createGoldBox,
    updateGoldBox,
    deleteGoldBox,
};
//# sourceMappingURL=goldBox.controller.js.map