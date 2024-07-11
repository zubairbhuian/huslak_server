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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const jwt_helper_1 = require("../../helper/jwt_helper");
const user_model_1 = require("./user.model");
// ! ====== Get  =======
const allUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const search = req.query.search || "";
    const cityId = ((_a = req.query.cityId) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    const nearHospitalId = ((_b = req.query.nearHospitalId) === null || _b === void 0 ? void 0 : _b.toString()) || "";
    const userType = ((_c = req.query.userType) === null || _c === void 0 ? void 0 : _c.toString()) || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    // hide
    const options = {
        password: 0,
        isAdmin: 0,
    };
    // search RegExp and filter
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
        isAdmin: { $ne: true },
        $or: [
            { name: { $regex: searchRegExp } },
            { email: { $regex: searchRegExp } },
            { phone: { $regex: searchRegExp } },
        ],
    };
    if (cityId) {
        filter['cityId'] = cityId;
    }
    if (nearHospitalId) {
        filter['nearHospitalId'] = nearHospitalId;
    }
    if (userType) {
        filter['userType'] = userType;
    }
    // totale items
    const count = yield user_model_1.UserModel.find(filter).countDocuments();
    // user find
    const users = yield user_model_1.UserModel.find(filter, options)
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
            total: Math.ceil(count),
        },
        data: users,
    });
}));
// ! ====== create user  =======
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if file is provided
    if (!req.file) {
        throw new ApiErrors_1.default(400, 'File is required');
    }
    // Get file name and path
    const filename = req.file.filename;
    const imgPath = `/uploads/user/${filename}`;
    // Get request body
    const { email, name, phone, password, userType, cityId, nearHospitalId } = req.body;
    try {
        const existingUser = yield user_model_1.UserModel.findOne({ email });
        if (existingUser) {
            throw new ApiErrors_1.default(400, 'Email already exists');
        }
        if (userType === 'admin') {
            throw new ApiErrors_1.default(400, 'You are not allowed to create an admin user');
        }
        // Add to database
        const user = yield user_model_1.UserModel.create({
            email, name, phone, password, img: imgPath, userType, cityId, nearHospitalId,
        });
        // If data is not created, throw an error
        if (!user) {
            throw new Error('Not created');
        }
        // Create a JWT token
        const token = jwt_helper_1.JWTHelper.generateToken(user._id);
        const userWithoutPassword = { _id: user._id, name: user.name, email: user.email, phone: user.phone, addreass: user.address, photoURL: user.img };
        // Send response
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Login successful',
            data: userWithoutPassword,
            token
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
// ! ====== Login user  =======
const longinUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userType } = req.body;
    // check email and password
    if (!email || !password) {
        throw new ApiErrors_1.default(400, 'email, and password is required');
    }
    // Check if the user exists
    const user = yield user_model_1.UserModel.findOne({ email });
    if (!userType && !(user.userType === "admin"))
        throw new ApiErrors_1.default(400, 'userType is required');
    if (!user) {
        throw new ApiErrors_1.default(400, 'User not found ,please signUp first');
    }
    if (userType) {
        if (userType !== user.userType) {
            throw new ApiErrors_1.default(400, 'User type is not valid');
        }
    }
    // Check if the password is correct
    const isPasswordValid = yield user.comparePassword(password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    // Create a JWT token
    const token = jwt_helper_1.JWTHelper.generateToken(user._id);
    const userWithoutPassword = { _id: user._id, name: user.name, email: user.email, phone: user.phone, addreass: user.address, photoURL: user.img };
    // Send response
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Login successful',
        data: userWithoutPassword,
        token
    });
    next();
}));
// ! ====== add  user extra info =======
const addUserExtraInfo = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    // request body
    const body = __rest(req.body, []);
    // check id 
    if (!id) {
        throw new ApiErrors_1.default(400, 'id is required');
    }
    // Check if the ID is valid
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new ApiErrors_1.default(400, 'Invalid ID');
    }
    // const updatedData = await UserModel.findByIdAndUpdate(id, { ...body }, { new: true },);
    const updatedData = yield user_model_1.UserModel.findByIdAndUpdate(id, Object.assign({}, body), { new: true, select: '-password -isAdmin -isBlock' });
    if (!updatedData) {
        throw new ApiErrors_1.default(404, 'Data not found');
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Add successfuly',
        data: updatedData,
    });
    next();
}));
exports.UserController = {
    allUser,
    createUser,
    longinUser,
    addUserExtraInfo
};
//# sourceMappingURL=user.controller.js.map