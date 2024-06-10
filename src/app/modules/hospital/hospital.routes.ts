import express from 'express'
import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import { HospitalController } from './hospital.controller';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
    {
        storage: FileUpload.storage("public/uploads/hospital"),
        limits: { fileSize: 3 * 1024 * 1024 }
    });


// Routes
router.get('/hospital',verifyToken, HospitalController.allHospital)
router.post('/hospital',verifyToken, upload.single('img'), HospitalController.createHospital)
router.put('/hospital',verifyToken, upload.single('img'), HospitalController.updateHospital)
router.delete('/hospital',verifyToken, HospitalController.deleteHospital)




export const HospitalRoute = router
