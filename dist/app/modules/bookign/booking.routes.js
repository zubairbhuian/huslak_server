"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoute = void 0;
const express_1 = __importDefault(require("express"));
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
// Routes
router.post('/book', verify_token_middleware_1.default, booking_controller_1.BookingController.createBooking);
router.put('/book/:id', verify_token_middleware_1.default, booking_controller_1.BookingController.updateBooking);
router.delete('/book/:id', verify_token_middleware_1.default, booking_controller_1.BookingController.deleteBooking);
router.get('/book', verify_token_middleware_1.default, booking_controller_1.BookingController.getUserBookings);
exports.BookingRoute = router;
//# sourceMappingURL=booking.routes.js.map