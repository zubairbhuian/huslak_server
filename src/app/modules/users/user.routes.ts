import express from 'express'

import multer from 'multer';
import path from 'path';
import { FileUpload } from '../../../utils/file_upload';
import { UserController } from './user.controller';
import verifyToken from '../../middleware/verify_token_middleware';

const router = express.Router()


// file Upload
const upload = multer(
  {
    storage: FileUpload.storage("public/uploads/user"),
    limits: { fileSize: 3 * 1024 * 1024 }
  });


// Routes
router.get('/', verifyToken, UserController.allUser)
router.post('/sign-up', upload.single('img'), UserController.createUser)
router.post('/login', UserController.longinUser)
router.post('/extra-info', UserController.addUserExtraInfo)





export const UserRoute = router