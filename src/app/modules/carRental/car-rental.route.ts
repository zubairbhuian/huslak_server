import express from 'express';
import multer from 'multer';
import { fileFilter, limits, storage } from '../../../utils/file_uploadv2';
import verifyToken from '../../middleware/verify_token_middleware';
import { CarRentalController } from './car-rental.controller';

const router = express.Router();

// File Upload Configuration
const upload = multer({
  storage: storage('/uploads/car-rental'),
  limits: limits,
  fileFilter: fileFilter
});

// Routes
router.get('/car-rental', verifyToken, CarRentalController.getAllRentals);
router.post('/car-rental', verifyToken, upload.single('img'), CarRentalController.createRental);
router.put('/car-rental', verifyToken, upload.single('img'), CarRentalController.updateRental);
router.delete('/car-rental', verifyToken, CarRentalController.deleteRental);

export const carRentalRouter = router;