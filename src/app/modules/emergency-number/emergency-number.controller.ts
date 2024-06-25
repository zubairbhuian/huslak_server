import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ApiErrors from "../../../errors/ApiErrors";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { EmergencyNumberModel } from "./emergency-number.model";


// ! ====== Get  =======
const allEmergencyNumber = catchAsync(async (req, res, next) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const nearHospitalId = req.query.nearHospitalId as string || "";
  const cityId = req.query.cityId as string || "";


  type TSearchCriteria = {
    isAdmin: { $ne: boolean };
    $or: { number: { $regex: RegExp } }[];
    nearHospitalId?: string;
    cityId?: string;
  }

  // search RegExp and filter
  const searchRegExp = new RegExp(".*" + search + ".*", "i");
  const filter: TSearchCriteria = {
    isAdmin: { $ne: true },
    $or: [
      { number: { $regex: searchRegExp } },
    ],
  };
  if (nearHospitalId) {
    filter['nearHospitalId'] = nearHospitalId;
  }
  if (cityId) {
    filter['cityId'] = cityId;
  }


  // totale items
  const count = await EmergencyNumberModel.find(filter).countDocuments();
  // user find
  const users = await EmergencyNumberModel.find(filter)
    .limit(limit)
    .skip((page - 1) * limit);
  if (!users) throw new Error('Can not get ');
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'success',
    pagination: {
      page: page,
      limit: limit,
      nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      prevousPage: page - 1 > 0 ? page - 1 : null,
      total: Math.ceil(count / limit),

    },
    data: users,
  });
  next()
})

// ! ====== create  =======
const createEmergencyNumber = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  // Get request body
  const { ...body } = req.body;
  // Add to database
  const data = await EmergencyNumberModel.create(body);

  // If data is not created, throw an error
  if (!data) {
    throw new Error('Not created');
  }

  // Send response

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Added successfully',
    data: data,
  });
  next();
});

// ! ====== Update  =======
const updateEmergencyNumber = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id as string;
  // request body
  const { ...body } = req.body;

  // check id 
  if (!id) {
    throw new ApiErrors(400, 'id is required')
  }
  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid ID')
  }
  // Find the document by ID and update it
  const updatedData = await EmergencyNumberModel.findByIdAndUpdate(id, { body }, { new: true });
  if (!updatedData) {
    throw new ApiErrors(404, 'Data not found')
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Add successfuly',
    data: updatedData,
  })
  next()

})



// ! ====== delete  =======
const deleteEmergencyNumber = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id as string;
  if (!id) {
    throw new ApiErrors(400, 'id is required')
  }
  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid ID')
  }
  // Find the document by ID and delete it
  const deletedData = await EmergencyNumberModel.findByIdAndDelete(id);

  if (!deletedData) {
    throw new ApiErrors(404, 'Data not found')
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Delete successfuly',
    data: deletedData,
  })
  next()
})




export const EmergencyNumberController = {
  createEmergencyNumber,
  allEmergencyNumber,
  updateEmergencyNumber,
  deleteEmergencyNumber
}