import express from 'express';
import multer from 'multer';
import { fileFilter, limits, storage } from '../../../utils/file_uploadv2';
import verifyToken from '../../middleware/verify_token_middleware';
import { CityController } from './city.controller';

const router = express.Router()


// file Upload
const upload = multer({
  storage: storage('/uploads/city'),
  limits: limits,
  fileFilter: fileFilter
});

// Routes
router.get('/city', verifyToken, CityController.allCity)
router.post('/city', verifyToken, upload.single('img'), CityController.createCity)
router.put('/city', verifyToken, upload.single('img'), CityController.updateCity)
router.delete('/city', verifyToken, CityController.deleteCity)




export const CityRoute = router
