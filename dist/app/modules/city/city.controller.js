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
exports.CityController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const city_model_1 = require("./city.model");
// ! ====== Get city =======
const allCity = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    // search RegExp and filter
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
        isAdmin: { $ne: true },
        $or: [
            { name: { $regex: searchRegExp } },
        ],
    };
    // totale items
    const count = yield city_model_1.CityModel.find(filter).countDocuments();
    // user find
    const users = yield city_model_1.CityModel.find(filter)
        .limit(limit)
        .skip((page - 1) * limit);
    if (!users)
        throw new Error('Can not get ');
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'success',
        pagination: {
            page: page,
            limit: limit,
            nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
            prevousPage: page - 1 > 0 ? page - 1 : null,
            total: Math.ceil(count / limit),
        },
        data: users,
    });
    next();
}));
// ! ====== create city =======
const createCity = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if file is provided
    if (!req.file) {
        throw new ApiErrors_1.default(400, 'File is required');
    }
    // Get file name and path
    const filename = req.file.filename;
    const imgPath = `/uploads/city/${filename}`;
    // Get request body
    const { name, temperature, countryId } = req.body;
    try {
        // Add to database
        const data = yield city_model_1.CityModel.create({
            name,
            temperature,
            countryId,
            img: imgPath
        });
        // If data is not created, throw an error
        if (!data) {
            throw new Error('City not created');
        }
        // Send response
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'City added successfully',
            data: data,
        });
        next();
    }
    catch (error) {
        // Delete the uploaded file if there is an error
        fs_extra_1.default.unlink(`public${imgPath}`, (err) => {
            if (err) {
                console.error(`Error deleting file public${imgPath}:`, err);
            }
            else {
                console.log(`File public${imgPath} deleted successfully.`);
            }
        });
        // Pass the error to the error handler
        next(error);
    }
}));
// ! ====== Update city =======
const updateCity = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    // request body
    const { name, temperature, countryId } = req.body;
    // check id 
    if (!id) {
        throw new ApiErrors_1.default(400, 'id is required');
    }
    // Check if the ID is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid ID');
    }
    // is file is null
    if (!req.file) {
        // Find the document by ID and update it
        const updatedData = yield city_model_1.CityModel.findByIdAndUpdate(id, { name, temperature, countryId }, { new: true });
        if (!updatedData) {
            throw new ApiErrors_1.default(404, 'Data not found');
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'City Add successfuly',
            data: updatedData,
        });
        next();
    }
    // file name
    const newFilename = req.file.filename;
    // new file path
    const NewFilePath = "/uploads/city/" + newFilename;
    // old data get from db
    const oldData = yield city_model_1.CityModel.findById(id);
    if (!oldData) {
        throw new ApiErrors_1.default(404, 'Data not found');
    }
    // Delete old file 
    const oldFilePath = "public/" + oldData.img;
    // Use fs-extra's unlink method to delete the file
    fs_extra_1.default.unlink(oldFilePath, (err) => {
        if (err) {
            console.error(`Error deleting file ${oldFilePath}:`, err);
        }
        else {
            console.log(`File ${oldFilePath} deleted successfully.`);
        }
    });
    // Find the document by ID and update it
    const updatedData = yield city_model_1.CityModel.findByIdAndUpdate(id, { name, temperature, countryId, img: NewFilePath }, { new: true });
    if (!updatedData) {
        throw new ApiErrors_1.default(404, 'Data not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'City updata successfuly',
        data: updatedData,
    });
    next();
}));
// ! ====== Update city =======
const deleteCity = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    // check id 
    if (!id) {
        throw new ApiErrors_1.default(400, 'id is required');
    }
    // Check if the ID is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid ID');
    }
    // old data get from db
    const oldData = yield city_model_1.CityModel.findById(id);
    if (!oldData) {
        throw new ApiErrors_1.default(404, 'Data not found');
    }
    // Delete old file 
    const oldFilePath = "public/" + oldData.img;
    // Use fs-extra's unlink method to delete the file
    fs_extra_1.default.unlink(oldFilePath, (err) => {
        if (err) {
            console.error(`Error deleting file ${oldFilePath}:`, err);
        }
        else {
            console.log(`File ${oldFilePath} deleted successfully.`);
        }
    });
    // Find the document by ID and delete it
    const deletedData = yield city_model_1.CityModel.findByIdAndDelete(id);
    if (!deletedData) {
        throw new ApiErrors_1.default(404, 'Data not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'City delete successfuly',
        data: deletedData,
    });
    next();
}));
exports.CityController = {
    createCity,
    allCity,
    updateCity,
    deleteCity
};
//# sourceMappingURL=city.controller.js.map