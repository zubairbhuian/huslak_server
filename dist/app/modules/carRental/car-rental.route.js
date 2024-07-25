"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRentalRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const file_uploadv2_1 = require("../../../utils/file_uploadv2");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const car_rental_controller_1 = require("./car-rental.controller");
const router = express_1.default.Router();
// File Upload Configuration
const upload = (0, multer_1.default)({
    storage: (0, file_uploadv2_1.storage)('/uploads/car-rental'),
    limits: file_uploadv2_1.limits,
    fileFilter: file_uploadv2_1.fileFilter
});
// Routes
router.get('/car-rental', verify_token_middleware_1.default, car_rental_controller_1.CarRentalController.getAllRentals);
router.post('/car-rental', verify_token_middleware_1.default, upload.single('img'), car_rental_controller_1.CarRentalController.createRental);
router.put('/car-rental', verify_token_middleware_1.default, upload.single('img'), car_rental_controller_1.CarRentalController.updateRental);
router.delete('/car-rental', verify_token_middleware_1.default, car_rental_controller_1.CarRentalController.deleteRental);
exports.carRentalRouter = router;
//# sourceMappingURL=car-rental.route.js.map