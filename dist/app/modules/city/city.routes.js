"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityRoute = void 0;
const express_1 = __importDefault(require("express"));
const city_controller_1 = require("./city.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/city"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/city', verify_token_middleware_1.default, city_controller_1.CityController.allCity);
router.post('/city', verify_token_middleware_1.default, upload.single('img'), city_controller_1.CityController.createCity);
router.put('/city', verify_token_middleware_1.default, upload.single('img'), city_controller_1.CityController.updateCity);
router.delete('/city', verify_token_middleware_1.default, city_controller_1.CityController.deleteCity);
exports.CityRoute = router;
//# sourceMappingURL=city.routes.js.map