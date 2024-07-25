import express from 'express';
import multer from 'multer';
import { FileUpload } from '../../../utils/file_upload';
import verifyToken from '../../middleware/verify_token_middleware';
import { ActivityController } from './activity.controller';

const router = express.Router()


// file Upload
const upload = multer(
  {
    storage: FileUpload.storage("public/uploads/activity"),
    limits: { fileSize: 3 * 1024 * 1024 }
  });


// Routes
router.get('/activity', verifyToken, ActivityController.allActivity)
router.post('/activity', verifyToken, upload.single('img'), ActivityController.createActivity)
router.put('/activity', verifyToken, upload.single('img'), ActivityController.updateActivity)
router.delete('/activity', verifyToken, ActivityController.deleteActivity)




export const ActivityRoute = router
