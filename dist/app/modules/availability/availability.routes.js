"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRoute = void 0;
const express_1 = __importDefault(require("express"));
const availability_controller_1 = require("./availability.controller");
const router = express_1.default.Router();
// Routes
router.post('/availability', availability_controller_1.ScheduleController.addAvailability);
router.put('/availability/:id', availability_controller_1.ScheduleController.updateAvailability);
router.delete('/availability/:id', availability_controller_1.ScheduleController.deleteAvailability);
router.get('/availability/:userId', availability_controller_1.ScheduleController.getUserAvailability);
exports.ScheduleRoute = router;
//# sourceMappingURL=availability.routes.js.map