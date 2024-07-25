import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ApiErrors from '../../../errors/ApiErrors';
import catchAsync from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/file_uploadv2';
import sendResponse from '../../../utils/sendResponse';
import AirportTransferModel from './airport-transfer.modal';


export type TSearchCriteria = {
  $or: [
    { make?: { $regex: RegExp } },
    { model?: { $regex: RegExp } },
    { location?: { $regex: RegExp } },
    { phone?: { $regex: RegExp } },
    { name?: { $regex: RegExp } },

  ]
  nearHospitalId?: string;
  cityId?: string;
  restaurantId?: string;
}


// ====== Get All Airport Transfers =======
const getAllTransfers = catchAsync(async (req: Request, res: Response,) => {
  const search = req.query.search || '';
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const nearHospitalId = req.query.nearHospitalId as string || '';
  const cityId = req.query.cityId as string || '';

  const searchRegExp = new RegExp('.*' + search + '.*', 'i');
  const filter: TSearchCriteria = {
    $or: [
      { make: { $regex: searchRegExp } },
      { model: { $regex: searchRegExp } },
      { location: { $regex: searchRegExp } },
      { phone: { $regex: searchRegExp } },
      { name: { $regex: searchRegExp } },
    ],
  };
  if (nearHospitalId) {
    filter['nearHospitalId'] = nearHospitalId;
  }
  if (cityId) {
    filter['cityId'] = cityId;
  }

  const count = await AirportTransferModel.find(filter).countDocuments();
  const transfers = await AirportTransferModel.find(filter)
    .limit(limit)
    .skip((page - 1) * limit);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Success',
    pagination: {
      page,
      limit,
      nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      prevousPage: page - 1 > 0 ? page - 1 : null,
      total: count,
    },
    data: transfers,
  });
});

// ====== Create Airport Transfer =======
const createTransfer = catchAsync(async (req: Request, res: Response,) => {
  if (!req.file) {
    throw new ApiErrors(400, 'File is required');
  }

  const filename: string = (req.file as Express.Multer.File).filename;
  const imgPath = `/uploads/airport-transfer/${filename}`;

  const { make, model, year, driverName, description, phone, rate, location, cityId, nearHospitalId } = req.body;

  const transfer = await AirportTransferModel.create({
    make,
    model,
    year,
    driverName,
    description,
    phone,
    rate,
    location,
    img: imgPath,
    cityId, nearHospitalId
  });

  if (!transfer) {
    await deleteFile(imgPath);
    throw new Error('Transfer not created');
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Transfer added successfully',
    data: transfer,
  });
});

// ====== Update Airport Transfer =======
const updateTransfer = catchAsync(async (req: Request, res: Response,) => {
  const id = req.query.id as string;
  const { make, model, year, driverName, description, phone, rate, location } = req.body;

  if (!id) {
    throw new ApiErrors(400, 'ID is required');
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid ID');
  }

  let imgPath: string | undefined;
  if (req.file) {
    const newFilename: string = (req.file as Express.Multer.File).filename;
    imgPath = `/uploads/airport-transfer/${newFilename}`;
  }

  const updateData: any = { make, model, year, driverName, description, phone, rate, location };
  if (imgPath) {
    const oldData = await AirportTransferModel.findById(id);
    if (oldData?.img) {
      await deleteFile(oldData.img);
    }
    updateData.img = imgPath;
  }

  const updatedTransfer = await AirportTransferModel.findByIdAndUpdate(id, updateData, { new: true });
  if (!updatedTransfer) {
    throw new ApiErrors(404, 'Transfer not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Transfer updated successfully',
    data: updatedTransfer,
  });
});

// ====== Delete Airport Transfer =======
const deleteTransfer = catchAsync(async (req: Request, res: Response,) => {
  const id = req.query.id as string;

  if (!id) {
    throw new ApiErrors(400, 'ID is required');
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid ID');
  }

  const transfer = await AirportTransferModel.findById(id);
  if (!transfer) {
    throw new ApiErrors(404, 'Transfer not found');
  }

  if (transfer.img) {
    await deleteFile(transfer.img);
  }

  const deletedTransfer = await AirportTransferModel.findByIdAndDelete(id);
  if (!deletedTransfer) {
    throw new ApiErrors(404, 'Transfer not found');
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Transfer deleted successfully',
    data: deletedTransfer,
  });
});

export const AirportTransferController = {
  getAllTransfers,
  createTransfer,
  updateTransfer,
  deleteTransfer,
};
