"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoute = void 0;
const express_1 = __importDefault(require("express"));
const hotel_controller_1 = require("./hotel.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/hotel"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/hotel', verify_token_middleware_1.default, hotel_controller_1.HotelController.allHotel);
router.post('/hotel', verify_token_middleware_1.default, upload.single('img'), hotel_controller_1.HotelController.createHotel);
router.put('/hotel', verify_token_middleware_1.default, upload.single('img'), hotel_controller_1.HotelController.updateHotel);
router.delete('/hotel', verify_token_middleware_1.default, hotel_controller_1.HotelController.deleteHotel);
exports.HotelRoute = router;
//# sourceMappingURL=hotel.routes.js.map