import express from 'express'
import { SuperMarketController } from './super-market.controller'
import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
    {
        storage: FileUpload.storage("public/uploads/super-market"),
        limits: { fileSize: 3 * 1024 * 1024 }
    });


// Routes
router.get('/super-market', verifyToken, SuperMarketController.allSuperMarket)
router.post('/super-market', verifyToken, upload.single('img'), SuperMarketController.createSuperMarket)
router.put('/super-market', verifyToken, upload.single('img'), SuperMarketController.updateSuperMarket)
router.delete('/super-market', verifyToken, SuperMarketController.deleteSuperMarket)




export const SuperMarketRoute = router
