"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperMarketRoute = void 0;
const express_1 = __importDefault(require("express"));
const super_market_controller_1 = require("./super-market.controller");
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/super-market"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/super-market', verify_token_middleware_1.default, super_market_controller_1.SuperMarketController.allSuperMarket);
router.post('/super-market', verify_token_middleware_1.default, upload.single('img'), super_market_controller_1.SuperMarketController.createSuperMarket);
router.put('/super-market', verify_token_middleware_1.default, upload.single('img'), super_market_controller_1.SuperMarketController.updateSuperMarket);
router.delete('/super-market', verify_token_middleware_1.default, super_market_controller_1.SuperMarketController.deleteSuperMarket);
exports.SuperMarketRoute = router;
//# sourceMappingURL=super-market.routes.js.map