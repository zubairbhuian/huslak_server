"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacyRoute = void 0;
const express_1 = __importDefault(require("express"));
const pharmacy_controller_1 = require("./pharmacy.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/pharmacy"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/pharmacy', verify_token_middleware_1.default, pharmacy_controller_1.PharmacyController.allPharmacy);
router.post('/pharmacy', verify_token_middleware_1.default, upload.single('img'), pharmacy_controller_1.PharmacyController.createPharmacy);
router.put('/pharmacy', verify_token_middleware_1.default, upload.single('img'), pharmacy_controller_1.PharmacyController.updatePharmacy);
router.delete('/pharmacy', verify_token_middleware_1.default, pharmacy_controller_1.PharmacyController.deletePharmacy);
exports.PharmacyRoute = router;
//# sourceMappingURL=pharmacy.routes.js.map