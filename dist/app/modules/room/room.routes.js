"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRoute = void 0;
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("./room.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/room"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/room', verify_token_middleware_1.default, room_controller_1.RoomController.allRoom);
router.post('/room', verify_token_middleware_1.default, upload.single('img'), room_controller_1.RoomController.createRoom);
router.put('/room', verify_token_middleware_1.default, upload.single('img'), room_controller_1.RoomController.updateRoom);
router.delete('/room', verify_token_middleware_1.default, room_controller_1.RoomController.deleteRoom);
exports.RoomRoute = router;
//# sourceMappingURL=room.routes.js.map