import express from 'express'
import { EmergencyNumberController } from './emergency-number.controller'
import verifyToken from '../../middleware/verify_token_middleware'


const router = express.Router()

// Routes
router.get('/emergency-number',verifyToken, EmergencyNumberController.allEmergencyNumber)
router.post('/emergency-number',verifyToken, EmergencyNumberController.createEmergencyNumber)
router.put('/emergency-number',verifyToken, EmergencyNumberController.updateEmergencyNumber)
router.delete('/emergency-number',verifyToken, EmergencyNumberController.deleteEmergencyNumber)




export const EmergencyNumberRoute = router
