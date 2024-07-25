import express from 'express';
import multer from 'multer';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';
import { FoodController } from './controller/food.controller';
import { RestaurantController } from './controller/restaurant.controller';

const router = express.Router()


// file Upload
const upload = multer(
  {
    storage: FileUpload.storage("public/uploads/restaurant"),
    limits: { fileSize: 3 * 1024 * 1024 }
  });

// file Upload
const upload2 = multer(
  {
    storage: FileUpload.storage("public/uploads/food"),
    limits: { fileSize: 3 * 1024 * 1024 }
  });


// Routes
router.get('/restaurant', verifyToken, RestaurantController.allRestaurant)
router.post('/restaurant', verifyToken, upload.single('img'), RestaurantController.createRestaurant)
router.put('/restaurant', verifyToken, upload.single('img'), RestaurantController.updateRestaurant)
router.delete('/restaurant', verifyToken, RestaurantController.deleteRestaurant)


router.get('/restaurant/food', verifyToken, FoodController.allFood)
router.post('/restaurant/food', verifyToken, upload2.single('img'), FoodController.createFood)
router.put('/restaurant/food', verifyToken, upload2.single('img'), FoodController.updateFood)
router.delete('/restaurant/food', verifyToken, FoodController.deleteFood)



export const RestaurantRoute = router
