import express from 'express'
import { HotelController } from './hotel.controller'
import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
    {
        storage: FileUpload.storage("public/uploads/hotel"),
        limits: { fileSize: 3 * 1024 * 1024 }
    });


// Routes
router.get('/hotel', verifyToken, HotelController.allHotel)
router.post('/hotel', verifyToken, upload.single('img'), HotelController.createHotel)
router.put('/hotel', verifyToken, upload.single('img'), HotelController.updateHotel)
router.delete('/hotel', verifyToken, HotelController.deleteHotel)




export const HotelRoute = router
