import express from 'express';
import multer from 'multer';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';
import { AtmController } from './atm.controller';

const router = express.Router()


// file Upload
const upload = multer(
  {
    storage: FileUpload.storage("public/uploads/atm"),
    limits: { fileSize: 3 * 1024 * 1024 }
  });


// Routes
router.get('/atm', verifyToken, AtmController.allAtm)
router.post('/atm', verifyToken, upload.single('img'), AtmController.createAtm)
router.put('/atm', verifyToken, upload.single('img'), AtmController.updateAtm)
router.delete('/atm', verifyToken, AtmController.deleteAtm)




export const AtmRoute = router
