import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ApiErrors from "../../../errors/ApiErrors";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { GoldBoxModel } from "./goldBox.model";

// Get all Gold Box records
const allGoldBox = catchAsync(async (req, res, next) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const searchRegExp = new RegExp(".*" + search + ".*", "i");
  const filter = {
    $or: [
      { name: { $regex: searchRegExp } },
      { phoneNumber: { $regex: searchRegExp } },
      { emailId: { $regex: searchRegExp } },
    ],
  };

  const count = await GoldBoxModel.find(filter).countDocuments();
  const records = await GoldBoxModel.find(filter)
    .limit(limit)
    .skip((page - 1) * limit);

  if (!records) throw new Error('Cannot get records');

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Success',
    pagination: {
      page: page,
      limit: limit,
      nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      prevousPage: page - 1 > 0 ? page - 1 : null,
      total: Math.ceil(count / limit),
    },
    data: records,
  });

  next();
});

// Create a new Gold Box record
const createGoldBox = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, phoneNumber, emailId, services, description } = req.body;

  try {
    const data = await GoldBoxModel.create({
      name,
      phoneNumber,
      emailId,
      services,
      description,
    });

    if (!data) throw new Error('Not created');

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Added successfully',
      data: data,
    });

    next();
  } catch (error) {
    next(error);
  }
});

// Update a Gold Box record
const updateGoldBox = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id as string;
  const { name, phoneNumber, emailId, services, description } = req.body;

  if (!id) throw new ApiErrors(400, 'ID is required');
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiErrors(400, 'Invalid ID');

  const updatedData = await GoldBoxModel.findByIdAndUpdate(
    id,
    { name, phoneNumber, emailId, services, description },
    { new: true }
  );

  if (!updatedData) throw new ApiErrors(404, 'Data not found');

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Updated successfully',
    data: updatedData,
  });

  next();
});

// Delete a Gold Box record
const deleteGoldBox = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id as string;

  if (!id) throw new ApiErrors(400, 'ID is required');
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiErrors(400, 'Invalid ID');

  const deletedData = await GoldBoxModel.findByIdAndDelete(id);

  if (!deletedData) throw new ApiErrors(404, 'Data not found');

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Deleted successfully',
    data: deletedData,
  });

  next();
});

export const GoldBoxController = {
  allGoldBox,
  createGoldBox,
  updateGoldBox,
  deleteGoldBox,
};
