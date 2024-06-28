import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ApiErrors from '../../../errors/ApiErrors';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { UserModel } from '../users/user.model';
import { AvailabilityModel } from './availability.sehema';

// Add Availability
const addAvailability = catchAsync(async (req: Request, res: Response) => {
  const { userId, dayName, availableTime, isAvailable } = req.body;

  // Check if userId is valid
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiErrors(400, 'Invalid user ID');
  }
  const User = await UserModel.findById(userId);
  if (!User) {
    throw new ApiErrors(404, 'User not found');
  }
  if (User.userType === 'user') {
    throw new ApiErrors(400, 'User cannot add availability');
  }
  const existingAvailability = await AvailabilityModel.findOne({ userId, dayName })
  if (existingAvailability) {
    throw new ApiErrors(400, 'Availability for this day already exists for the user');
  }
  const availability = new AvailabilityModel({
    userId,
    dayName,
    availableTime,
    isAvailable,
  });

  await availability.save();

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Availability added successfully',
    data: availability,
  });

});

// Update Availability
const updateAvailability = catchAsync(async (req: Request, res: Response,) => {
  const { id } = req.params;
  const { dayName, availableTime, isAvailable } = req.body;

  // Check if id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid availability ID');
  }

  const availability = await AvailabilityModel.findByIdAndUpdate(id, {
    dayName,
    availableTime,
    isAvailable,
  }, { new: true });

  if (!availability) {
    throw new ApiErrors(404, 'Availability not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Availability updated successfully',
    data: availability,
  });

});

// Delete Availability
const deleteAvailability = catchAsync(async (req: Request, res: Response,) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid availability ID');
  }
  const availability = await AvailabilityModel.findByIdAndDelete(id);

  if (!availability) {
    throw new ApiErrors(404, 'Availability not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Availability deleted successfully',
    data: availability,
  });
});

// Get User Availability
const getUserAvailability = catchAsync(async (req: Request, res: Response,) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiErrors(400, 'Invalid user ID');
  }

  const availabilities = await AvailabilityModel.find({ userId }).populate('userId');

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User availability fetched successfully',
    data: availabilities,
  });
});

export const ScheduleController = {
  addAvailability,
  updateAvailability,
  deleteAvailability,
  getUserAvailability,
};
