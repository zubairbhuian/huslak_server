"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryRoute = void 0;
const express_1 = __importDefault(require("express"));
const country_controller_1 = require("./country.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/country"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/country', verify_token_middleware_1.default, country_controller_1.CountryController.allCountry);
router.post('/country', verify_token_middleware_1.default, upload.single('img'), country_controller_1.CountryController.createCountry);
router.put('/country', verify_token_middleware_1.default, upload.single('img'), country_controller_1.CountryController.updateCountry);
router.delete('/country', verify_token_middleware_1.default, country_controller_1.CountryController.deleteCountry);
exports.CountryRoute = router;
//# sourceMappingURL=country.routes.js.map