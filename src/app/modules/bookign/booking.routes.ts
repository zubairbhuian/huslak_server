import express from 'express';
import verifyToken from '../../middleware/verify_token_middleware';
import { BookingController } from './booking.controller';

const router = express.Router();

// Routes
router.post('/book', verifyToken, BookingController.createBooking);
router.put('/book/:id', verifyToken, BookingController.updateBooking);
router.delete('/book/:id', verifyToken, BookingController.deleteBooking);
router.get('/book/:userId', verifyToken, BookingController.getUserBookings);

export const BookingRoute = router;
