"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.airportRouter = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const file_uploadv2_1 = require("../../../utils/file_uploadv2");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const airport_transfer_controller_1 = require("./airport-transfer.controller");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({
    storage: (0, file_uploadv2_1.storage)('/uploads/airport-transfer'),
    limits: file_uploadv2_1.limits,
    fileFilter: file_uploadv2_1.fileFilter
});
router.get('/airport-transport', verify_token_middleware_1.default, airport_transfer_controller_1.AirportTransferController.getAllTransfers);
router.post('/airport-transport', verify_token_middleware_1.default, upload.single('img'), airport_transfer_controller_1.AirportTransferController.createTransfer);
router.put('/airport-transport', verify_token_middleware_1.default, upload.single('img'), airport_transfer_controller_1.AirportTransferController.updateTransfer);
router.delete('/airport-transport', verify_token_middleware_1.default, airport_transfer_controller_1.AirportTransferController.deleteTransfer);
exports.airportRouter = router;
//# sourceMappingURL=airport-transfer.routes.js.map