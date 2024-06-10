"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyNumberRoute = void 0;
const express_1 = __importDefault(require("express"));
const emergency_number_controller_1 = require("./emergency-number.controller");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// Routes
router.get('/emergency-number', verify_token_middleware_1.default, emergency_number_controller_1.EmergencyNumberController.allEmergencyNumber);
router.post('/emergency-number', verify_token_middleware_1.default, emergency_number_controller_1.EmergencyNumberController.createEmergencyNumber);
router.put('/emergency-number', verify_token_middleware_1.default, emergency_number_controller_1.EmergencyNumberController.updateEmergencyNumber);
router.delete('/emergency-number', verify_token_middleware_1.default, emergency_number_controller_1.EmergencyNumberController.deleteEmergencyNumber);
exports.EmergencyNumberRoute = router;
//# sourceMappingURL=emergency-number.routes.js.map