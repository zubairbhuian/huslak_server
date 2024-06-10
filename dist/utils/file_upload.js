"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
function storage(destination) {
    return multer_1.default.diskStorage({
        destination: destination,
        filename: function (req, file, cb) {
            // Ensure the file extension is .png or .jpg
            const allowedExtensions = ['.png', '.jpg'];
            const ext = path_1.default.extname(file.originalname).toLowerCase();
            if (allowedExtensions.includes(ext)) {
                // Create a unique filename
                const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
                // Set filename to be unique + original extension
                cb(null, file.fieldname + '_' + uniqueSuffix + ext);
            }
            else {
                cb(new Error('Only .png and .jpg files are allowed!'), "Err");
            }
        }
    });
}
exports.FileUpload = {
    storage,
};
//# sourceMappingURL=file_upload.js.map