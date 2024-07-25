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
exports.fileFilter = exports.limits = exports.storage = exports.deleteFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const multer_1 = __importDefault(require("multer"));
// Function to delete file asynchronously if it exists
const deleteFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fullPath = `public${filePath}`;
    if (fs_extra_1.default.existsSync(fullPath)) {
        try {
            yield fs_extra_1.default.unlink(fullPath);
            console.log(`File ${fullPath} deleted successfully.`);
        }
        catch (err) {
            console.error(`Error deleting file ${fullPath}:`, err);
        }
    }
    else {
        console.warn(`File ${fullPath} does not exist.`);
    }
});
exports.deleteFile = deleteFile;
const storage = (destination) => multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `public${destination}`);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
exports.storage = storage;
exports.limits = {
    fileSize: 3 * 1024 * 1024, // 3MB
};
const fileFilter = (req, file, cb) => {
    // Accept image files only
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image files are allowed!'), false);
    }
};
exports.fileFilter = fileFilter;
//# sourceMappingURL=file_uploadv2.js.map