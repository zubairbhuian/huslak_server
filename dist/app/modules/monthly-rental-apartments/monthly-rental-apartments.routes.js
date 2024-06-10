"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyRentalApartmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const monthly_rental_apartments_controller_1 = require("./monthly-rental-apartments.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/monthly-rental-apartment"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/monthly-rental-apartment', verify_token_middleware_1.default, monthly_rental_apartments_controller_1.MonthlyRentalApartmentController.allMonthlyRentalApartment);
router.post('/monthly-rental-apartment', verify_token_middleware_1.default, upload.single('img'), monthly_rental_apartments_controller_1.MonthlyRentalApartmentController.createMonthlyRentalApartment);
router.put('/monthly-rental-apartment', verify_token_middleware_1.default, upload.single('img'), monthly_rental_apartments_controller_1.MonthlyRentalApartmentController.updateMonthlyRentalApartment);
router.delete('/monthly-rental-apartment', verify_token_middleware_1.default, monthly_rental_apartments_controller_1.MonthlyRentalApartmentController.deleteMonthlyRentalApartment);
exports.MonthlyRentalApartmentRoute = router;
//# sourceMappingURL=monthly-rental-apartments.routes.js.map