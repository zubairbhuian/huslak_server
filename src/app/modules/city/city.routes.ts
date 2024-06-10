import express from 'express'
import { CityController } from './city.controller'
import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
    {
        storage: FileUpload.storage("public/uploads/city"),
        limits: { fileSize: 3 * 1024 * 1024 }
    });


// Routes
router.get('/city',verifyToken, CityController.allCity)
router.post('/city',verifyToken, upload.single('img'), CityController.createCity)
router.put('/city',verifyToken, upload.single('img'), CityController.updateCity)
router.delete('/city',verifyToken, CityController.deleteCity)




export const CityRoute = router
