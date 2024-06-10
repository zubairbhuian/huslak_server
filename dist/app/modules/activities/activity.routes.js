"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRoute = void 0;
const express_1 = __importDefault(require("express"));
const activity_controller_1 = require("./activity.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/activity"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/activity', verify_token_middleware_1.default, activity_controller_1.ActivityController.allActivity);
router.post('/activity', verify_token_middleware_1.default, upload.single('img'), activity_controller_1.ActivityController.createActivity);
router.put('/activity', verify_token_middleware_1.default, upload.single('img'), activity_controller_1.ActivityController.updateActivity);
router.delete('/activity', verify_token_middleware_1.default, activity_controller_1.ActivityController.deleteActivity);
exports.ActivityRoute = router;
//# sourceMappingURL=activity.routes.js.map