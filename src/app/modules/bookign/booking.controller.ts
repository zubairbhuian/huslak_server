import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ApiErrors from '../../../errors/ApiErrors';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { AvailabilityModel } from '../availability/availability.sehema';
import { UserModel } from '../users/user.model';
import { BookingModel } from './booking.modal';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const { userId, providerId, availabilityId, date } = req.body;

  if (userId === providerId) {
    throw new ApiErrors(400, 'User cannot book his/her own availability');
  }

  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(providerId) || !mongoose.Types.ObjectId.isValid(availabilityId)) {
    throw new ApiErrors(400, 'Invalid user, provider, or availability ID');
  }

  const findUser = await UserModel.findById(userId);
  if (!findUser) {
    throw new ApiErrors(404, 'User not found');
  }
  const availability = await AvailabilityModel.findOne({ _id: availabilityId, userId: providerId });
  if (!availability) {
    throw new ApiErrors(400, 'Provider is not available at the specified date and time');
  }
  const existingBooking = await BookingModel.findOne({ userId, availabilityId });
  if (existingBooking) {
    throw new ApiErrors(400, 'You have already booked this availability');
  }

  // Create booking
  const booking = new BookingModel({
    userId,
    providerId,
    availabilityId,
    date,
    status: 'pending',
  });

  await booking.save();

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Booking created successfully',
    data: booking,
  });
});

// Update Booking
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { date, status } = req.body;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid booking ID');
  }

  const booking = await BookingModel.findByIdAndUpdate(id, {
    date,
    status,
  }, { new: true });

  if (!booking) {
    throw new ApiErrors(404, 'Booking not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking updated successfully',
    data: booking,
  });
});

// Delete Booking
const deleteBooking = catchAsync(async (req: Request, res: Response,) => {
  const { id } = req.params;

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid booking ID');
  }

  const booking = await BookingModel.findByIdAndDelete(id);

  if (!booking) {
    throw new ApiErrors(404, 'Booking not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Booking deleted successfully',
    data: booking,
  });
});

// Get User Bookings
const getUserBookings = catchAsync(async (req: Request, res: Response,) => {
  const { userId } = req.params;
  const { status } = req.query;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiErrors(400, 'Invalid user ID');
  }

  // add status filter
  let filter
  if (status) {
    filter = { userId, status }
  } else {
    filter = { userId }
  }

  const bookings = await BookingModel.find(filter)
    .populate('userId', '-password')
    .populate('providerId', '-password')
    .populate('availabilityId');


  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User bookings fetched successfully',
    data: bookings,
  });
});

export const BookingController = {
  createBooking,
  updateBooking,
  deleteBooking,
  getUserBookings,
};
