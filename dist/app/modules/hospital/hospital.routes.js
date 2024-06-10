"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalRoute = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const hospital_controller_1 = require("./hospital.controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/hospital"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/hospital', verify_token_middleware_1.default, hospital_controller_1.HospitalController.allHospital);
router.post('/hospital', verify_token_middleware_1.default, upload.single('img'), hospital_controller_1.HospitalController.createHospital);
router.put('/hospital', verify_token_middleware_1.default, upload.single('img'), hospital_controller_1.HospitalController.updateHospital);
router.delete('/hospital', verify_token_middleware_1.default, hospital_controller_1.HospitalController.deleteHospital);
exports.HospitalRoute = router;
//# sourceMappingURL=hospital.routes.js.map