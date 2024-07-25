import express from 'express';
import multer from 'multer';
import { fileFilter, limits, storage } from '../../../utils/file_uploadv2';
import verifyToken from '../../middleware/verify_token_middleware';
import { AirportTransferController } from './airport-transfer.controller';

const router = express.Router()


const upload = multer({
  storage: storage('/uploads/airport-transfer'),
  limits: limits,
  fileFilter: fileFilter
});

router.get('/airport-transport', verifyToken, AirportTransferController.getAllTransfers)
router.post('/airport-transport', verifyToken, upload.single('img'), AirportTransferController.createTransfer)
router.put('/airport-transport', verifyToken, upload.single('img'), AirportTransferController.updateTransfer)
router.delete('/airport-transport', verifyToken, AirportTransferController.deleteTransfer)


export const airportRouter = router;