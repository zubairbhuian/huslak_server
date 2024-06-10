"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtmRoute = void 0;
const express_1 = __importDefault(require("express"));
const atm_controller_1 = require("./atm.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/atm"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/atm', verify_token_middleware_1.default, atm_controller_1.AtmController.allAtm);
router.post('/atm', verify_token_middleware_1.default, upload.single('img'), atm_controller_1.AtmController.createAtm);
router.put('/atm', verify_token_middleware_1.default, upload.single('img'), atm_controller_1.AtmController.updateAtm);
router.delete('/atm', verify_token_middleware_1.default, atm_controller_1.AtmController.deleteAtm);
exports.AtmRoute = router;
//# sourceMappingURL=atm.routes.js.map