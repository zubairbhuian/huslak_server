"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryRoute = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const country_controller_1 = require("./country.controller");
const file_uploadv2_1 = require("../../../utils/file_uploadv2");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    storage: (0, file_uploadv2_1.storage)('/uploads/country'),
    limits: file_uploadv2_1.limits,
    fileFilter: file_uploadv2_1.fileFilter
});
// Routes
router.get('/country', verify_token_middleware_1.default, country_controller_1.CountryController.allCountry);
router.post('/country', verify_token_middleware_1.default, upload.single('img'), country_controller_1.CountryController.createCountry);
router.put('/country', verify_token_middleware_1.default, upload.single('img'), country_controller_1.CountryController.updateCountry);
router.delete('/country', verify_token_middleware_1.default, country_controller_1.CountryController.deleteCountry);
exports.CountryRoute = router;
//# sourceMappingURL=country.routes.js.map