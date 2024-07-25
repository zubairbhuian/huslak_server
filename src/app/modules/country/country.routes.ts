import express from 'express';
import multer from 'multer';
import { CountryController } from './country.controller';

import { fileFilter, limits, storage } from '../../../utils/file_uploadv2';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()

const upload = multer({
  storage: storage('/uploads/country'),
  limits: limits,
  fileFilter: fileFilter
});

// Routes
router.get('/country', verifyToken, CountryController.allCountry)
router.post('/country', verifyToken, upload.single('img'), CountryController.createCountry)
router.put('/country', verifyToken, upload.single('img'), CountryController.updateCountry)
router.delete('/country', verifyToken, CountryController.deleteCountry)




export const CountryRoute = router
