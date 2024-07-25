import { Request, Response } from 'express';
import mongoose from 'mongoose';
import ApiErrors from '../../../errors/ApiErrors';
import catchAsync from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/file_uploadv2';
import sendResponse from '../../../utils/sendResponse';
import CarRentalModel from './car-rental.modal';


export type TSearchCriteria = {
  $or: [
    { make?: { $regex: RegExp } },
    { model?: { $regex: RegExp } },
    { location?: { $regex: RegExp } },
    { phone?: { $regex: RegExp } },
  ]
  nearHospitalId?: string;
  cityId?: string;
  restaurantId?: string;
}

// ====== Get All Car Rentals =======
const getAllRentals = catchAsync(async (req: Request, res: Response) => {
  const search = req.query.search || '';
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const nearHospitalId = req.query.nearHospitalId as string || "";
  const cityId = req.query.cityId as string || "";

  const searchRegExp = new RegExp('.*' + search + '.*', 'i');
  const filter: TSearchCriteria = {
    $or: [
      { make: { $regex: searchRegExp } },
      { model: { $regex: searchRegExp } },
      { location: { $regex: searchRegExp } },
      { phone: { $regex: searchRegExp } },
    ],
  };
  if (nearHospitalId) {
    filter['nearHospitalId'] = nearHospitalId;
  }
  if (cityId) {
    filter['cityId'] = cityId;
  }


  const count = await CarRentalModel.find(filter).countDocuments();
  const rentals = await CarRentalModel.find(filter)
    .limit(limit)
    .skip((page - 1) * limit);
  if (!rentals) throw new Error('Cannot get rentals');

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
    data: rentals,
  });
});

// ====== Create Car Rental =======
const createRental = catchAsync(async (req: Request, res: Response) => {
  const { make, model, year, seats, bags, pricePerDay, location, phone, cityId, nearHospitalId } = req.body;

  if (!req.file) { throw new ApiErrors(400, 'File is required'); }
  const filename: string = (req.file as Express.Multer.File).filename;
  const imgPath = `/uploads/car-rental/${filename}`;

  const rental = await CarRentalModel.create({
    make,
    model,
    year,
    seats,
    bags,
    location,
    phone,
    pricePerDay,
    img: imgPath,
    cityId, nearHospitalId
  });

  if (!rental) {
    await deleteFile(imgPath);
    throw new Error('Rental not created');
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Rental added successfully',
    data: rental,
  });
});

// ====== Update Car Rental =======
const updateRental = catchAsync(async (req: Request, res: Response) => {
  const id = req.query.id as string;
  const { make, model, year, seats, bags, pricePerDay, location, phone } = req.body;
  if (!id) { throw new ApiErrors(400, 'ID is required'); }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid ID');
  }
  const currentRental = await CarRentalModel.findById(id);

  if (req.file) {
    // Delete old file if it exists
    if (currentRental?.img) {
      await deleteFile(currentRental.img);
    }
    const nameImg: string = (req.file as Express.Multer.File).filename;
    const newPath = `/uploads/car-rental/${nameImg}`;
    const updateData: any = {
      make, model, year, seats, bags, pricePerDay, location, phone, img: newPath
    };
    const updatedRental = await CarRentalModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRental) {
      throw new ApiErrors(404, 'Rental not found');
    }
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Rental updated successfully',
      data: updatedRental,
    });
  } else {
    const updateData = { make, model, year, seats, bags, pricePerDay, location, phone };
    const updatedRental = await CarRentalModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRental) {
      throw new ApiErrors(404, 'Rental not found');
    }
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Rental updated successfully',
      data: updatedRental,
    });
  }
});

// ====== Delete Car Rental =======
const deleteRental = catchAsync(async (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (!id) {
    throw new ApiErrors(400, 'ID is required');
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid ID');
  }
  const deletedRental = await CarRentalModel.findByIdAndDelete(id);
  if (!deletedRental) {
    throw new ApiErrors(404, 'Rental not found');
  }
  if (deletedRental.img) {
    await deleteFile(deletedRental.img);
  }

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Rental deleted successfully',
    data: deletedRental,
  });
});

export const CarRentalController = {
  getAllRentals,
  createRental,
  updateRental,
  deleteRental,
};
