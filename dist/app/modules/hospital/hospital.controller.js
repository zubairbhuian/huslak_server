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
exports.HospitalController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const hospital_model_1 = require("./hospital.model");
// ! ====== Get  =======
const allHospital = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const nearHospitalId = req.query.nearHospitalId || "";
    const cityId = req.query.cityId || "";
    // search RegExp and filter
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
        isAdmin: { $ne: true },
        $or: [
            { name: { $regex: searchRegExp } },
        ],
    };
    if (nearHospitalId) {
        filter['nearHospitalId'] = nearHospitalId;
    }
    if (cityId) {
        filter['cityId'] = cityId;
    }
    // totale items
    const count = yield hospital_model_1.HospitalModel.find(filter).countDocuments();
    // user find
    const users = yield hospital_model_1.HospitalModel.find(filter)
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
// ! ====== create  =======
const createHospital = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if file is provided
    if (!req.file) {
        throw new ApiErrors_1.default(400, 'File is required');
    }
    // Get file name and path
    const filename = req.file.filename;
    const imgPath = `/uploads/hospital/${filename}`;
    // Get request body
    const { name, cityId, address } = req.body;
    try {
        // Add to database
        const data = yield hospital_model_1.HospitalModel.create({
            name,
            cityId,
            address,
            img: imgPath
        });
        // If data is not created, throw an error
        if (!data) {
            throw new Error('Hospital not created');
        }
        // Send response
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Hospital added successfully',
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
// ! ====== Update  =======
const updateHospital = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    // request body
    const { name, cityId, address } = req.body;
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
        const updatedData = yield hospital_model_1.HospitalModel.findByIdAndUpdate(id, { name, address, cityId }, { new: true });
        if (!updatedData) {
            throw new ApiErrors_1.default(404, 'Data not found');
        }
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: 200,
            message: 'Hospital update successfuly',
            data: updatedData,
        });
        next();
    }
    // file name
    const newFilename = req.file.filename;
    // new file path
    const NewFilePath = "/uploads/hospital/" + newFilename;
    // old data get from db
    const oldData = yield hospital_model_1.HospitalModel.findById(id);
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
    const updatedData = yield hospital_model_1.HospitalModel.findByIdAndUpdate(id, { name, cityId, address, img: NewFilePath }, { new: true });
    if (!updatedData) {
        throw new ApiErrors_1.default(404, 'Data not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Hospital updata successfuly',
        data: updatedData,
    });
    next();
}));
// ! ====== Delete Hospital =======
const deleteHospital = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (!id) {
        throw new ApiErrors_1.default(400, 'id is required');
    }
    // Check if the ID is valid
    // Check if the ID is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid ID');
    }
    // old data get from db
    const oldData = yield hospital_model_1.HospitalModel.findById(id);
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
    const deletedData = yield hospital_model_1.HospitalModel.findByIdAndDelete(id);
    if (!deletedData) {
        throw new ApiErrors_1.default(404, 'Data not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Hospital delete successfuly',
        data: deletedData,
    });
    next();
}));
exports.HospitalController = {
    createHospital,
    allHospital,
    updateHospital,
    deleteHospital
};
//# sourceMappingURL=hospital.controller.js.map