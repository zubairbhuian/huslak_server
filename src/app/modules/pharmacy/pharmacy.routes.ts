import express from 'express'
import { PharmacyController } from './pharmacy.controller'
import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
    {
        storage: FileUpload.storage("public/uploads/pharmacy"),
        limits: { fileSize: 3 * 1024 * 1024 }
    });


// Routes
router.get('/pharmacy', verifyToken, PharmacyController.allPharmacy)
router.post('/pharmacy', verifyToken, upload.single('img'), PharmacyController.createPharmacy)
router.put('/pharmacy', verifyToken, upload.single('img'), PharmacyController.updatePharmacy)
router.delete('/pharmacy', verifyToken, PharmacyController.deletePharmacy)




export const PharmacyRoute = router
