import express from 'express'
import { RoomController } from './room.controller'
import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
    {
        storage: FileUpload.storage("public/uploads/room"),
        limits: { fileSize: 3 * 1024 * 1024 }
    });


// Routes
router.get('/room', verifyToken, RoomController.allRoom)
router.post('/room', verifyToken, upload.single('img'), RoomController.createRoom)
router.put('/room', verifyToken, upload.single('img'), RoomController.updateRoom)
router.delete('/room', verifyToken, RoomController.deleteRoom)




export const RoomRoute = router
