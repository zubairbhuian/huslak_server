import express from 'express'
import { ShortStayApartmentsController } from './short-stay-apartments.controller'
import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
    {
        storage: FileUpload.storage("public/uploads/short-stay-apartments"),
        limits: { fileSize: 3 * 1024 * 1024 }
    });


// Routes
router.get('/short-stay-apartment', verifyToken, ShortStayApartmentsController.allshortStayApartments)
router.post('/short-stay-apartment', verifyToken, upload.single('img'), ShortStayApartmentsController.createshortStayApartments)
router.put('/short-stay-apartment', verifyToken, upload.single('img'), ShortStayApartmentsController.updateshortStayApartments)
router.delete('/short-stay-apartment', verifyToken, ShortStayApartmentsController.deleteshortStayApartments)




export const ShortStayApartmentsRoute = router
