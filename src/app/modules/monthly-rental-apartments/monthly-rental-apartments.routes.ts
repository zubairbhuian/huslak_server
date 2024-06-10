import express from 'express'
import { MonthlyRentalApartmentController } from './monthly-rental-apartments.controller'
import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
    {
        storage: FileUpload.storage("public/uploads/monthly-rental-apartment"),
        limits: { fileSize: 3 * 1024 * 1024 }
    });


// Routes
router.get('/monthly-rental-apartment', verifyToken, MonthlyRentalApartmentController.allMonthlyRentalApartment)
router.post('/monthly-rental-apartment', verifyToken, upload.single('img'), MonthlyRentalApartmentController.createMonthlyRentalApartment)
router.put('/monthly-rental-apartment', verifyToken, upload.single('img'), MonthlyRentalApartmentController.updateMonthlyRentalApartment)
router.delete('/monthly-rental-apartment', verifyToken, MonthlyRentalApartmentController.deleteMonthlyRentalApartment)




export const MonthlyRentalApartmentRoute = router
