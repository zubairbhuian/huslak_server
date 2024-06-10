"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const user_controller_1 = require("./user.controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/user"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/', verify_token_middleware_1.default, user_controller_1.UserController.allUser);
router.post('/sign-up', upload.single('img'), user_controller_1.UserController.createUser);
router.post('/login', user_controller_1.UserController.longinUser);
router.post('/extra-info', user_controller_1.UserController.addUserExtraInfo);
exports.UserRoute = router;
//# sourceMappingURL=user.routes.js.map