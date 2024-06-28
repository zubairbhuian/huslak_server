import express from 'express';
import { ScheduleController } from './availability.controller';

const router = express.Router();

// Routes
router.post('/availability', ScheduleController.addAvailability);
router.put('/availability/:id', ScheduleController.updateAvailability);
router.delete('/availability/:id', ScheduleController.deleteAvailability);
router.get('/availability/:userId', ScheduleController.getUserAvailability);

export const ScheduleRoute = router;