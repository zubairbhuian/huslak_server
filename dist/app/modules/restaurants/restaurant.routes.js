"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantRoute = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const file_upload_1 = require("../../../utils/file_upload");
const verify_token_middleware_1 = __importDefault(require("../../middleware/verify_token_middleware"));
const food_controller_1 = require("./controller/food.controller");
const restaurant_controller_1 = require("./controller/restaurant.controller");
const router = express_1.default.Router();
// file Upload
const upload = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/restaurant"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// file Upload
const upload2 = (0, multer_1.default)({
    storage: file_upload_1.FileUpload.storage("public/uploads/food"),
    limits: { fileSize: 3 * 1024 * 1024 }
});
// Routes
router.get('/restaurant', verify_token_middleware_1.default, restaurant_controller_1.RestaurantController.allRestaurant);
router.post('/restaurant', verify_token_middleware_1.default, upload.single('img'), restaurant_controller_1.RestaurantController.createRestaurant);
router.put('/restaurant', verify_token_middleware_1.default, upload.single('img'), restaurant_controller_1.RestaurantController.updateRestaurant);
router.delete('/restaurant', verify_token_middleware_1.default, restaurant_controller_1.RestaurantController.deleteRestaurant);
router.get('/restaurant/food', verify_token_middleware_1.default, food_controller_1.FoodController.allFood);
router.post('/restaurant/food', verify_token_middleware_1.default, upload2.single('img'), food_controller_1.FoodController.createFood);
router.put('/restaurant/food', verify_token_middleware_1.default, upload2.single('img'), food_controller_1.FoodController.updateFood);
router.delete('/restaurant/food', verify_token_middleware_1.default, food_controller_1.FoodController.deleteFood);
exports.RestaurantRoute = router;
//# sourceMappingURL=restaurant.routes.js.map