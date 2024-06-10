"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortStayApartmentsRoute = void 0;
const express_1 = __importDefault(require("express"));
const short_stay_apartments_controller_1 = require("./short-stay-apartments.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/short-stay-apartments"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/short-stay-apartment', verify_token_middleware_1.default, short_stay_apartments_controller_1.ShortStayApartmentsController.allshortStayApartments);
router.post('/short-stay-apartment', verify_token_middleware_1.default, upload.single('img'), short_stay_apartments_controller_1.ShortStayApartmentsController.createshortStayApartments);
router.put('/short-stay-apartment', verify_token_middleware_1.default, upload.single('img'), short_stay_apartments_controller_1.ShortStayApartmentsController.updateshortStayApartments);
router.delete('/short-stay-apartment', verify_token_middleware_1.default, short_stay_apartments_controller_1.ShortStayApartmentsController.deleteshortStayApartments);
exports.ShortStayApartmentsRoute = router;
//# sourceMappingURL=short-stay-apartments.routes.js.map