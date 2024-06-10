import express from 'express'
import { CountryController } from './country.controller'
import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
    {
        storage: FileUpload.storage("public/uploads/country"),
        limits: { fileSize: 3 * 1024 * 1024 }
    });


// Routes
router.get('/country', verifyToken, CountryController.allCountry)
router.post('/country', verifyToken, upload.single('img'), CountryController.createCountry)
router.put('/country', verifyToken, upload.single('img'), CountryController.updateCountry)
router.delete('/country', verifyToken, CountryController.deleteCountry)




export const CountryRoute = router
