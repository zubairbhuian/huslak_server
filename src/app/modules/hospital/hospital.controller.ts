import { NextFunction, Request, Response } from "express";
import fs from 'fs-extra';
import mongoose from "mongoose";
import ApiErrors from "../../../errors/ApiErrors";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { TSearchCriteria } from "../activities/activity.controller";
import { HospitalModel } from "./hospital.model";


// ! ====== Get  =======
const allHospital = catchAsync(async (req, res, next) => {
  const search = req.query.search || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const nearHospitalId = req.query.nearHospitalId as string || "";
  const cityId = req.query.cityId as string || "";

  // search RegExp and filter
  const searchRegExp = new RegExp(".*" + search + ".*", "i");
  const filter: TSearchCriteria = {
    isAdmin: { $ne: true },
    $or: [
      { name: { $regex: searchRegExp } },
    ],
  };
  if (nearHospitalId) {
    filter['nearHospitalId'] = nearHospitalId;
  }
  if (cityId) {
    filter['cityId'] = cityId;
  }

  // totale items
  const count = await HospitalModel.find(filter).countDocuments();
  // user find
  const users = await HospitalModel.find(filter)
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
const createHospital = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Check if file is provided
  if (!req.file) {
    throw new ApiErrors(400, 'File is required');
  }

  // Get file name and path
  const filename: string = (req.file as Express.Multer.File).filename;
  const imgPath: string = `/uploads/hospital/${filename}`;

  // Get request body
  const { name, cityId, address } = req.body;

  try {
    // Add to database
    const data = await HospitalModel.create({
      name,
      cityId,
      address,
      img: imgPath
    });

    // If data is not created, throw an error
    if (!data) {
      throw new Error('Hospital not created');
    }

    // Send response
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Hospital added successfully',
      data: data,
    });

    next();
  } catch (error) {
    // Delete the uploaded file if there is an error
    fs.unlink(`public${imgPath}`, (err) => {
      if (err) {
        console.error(`Error deleting file public${imgPath}:`, err);
      } else {
        console.log(`File public${imgPath} deleted successfully.`);
      }
    });

    // Pass the error to the error handler
    next(error);
  }
});

// ! ====== Update  =======
const updateHospital = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.query.id as string;
  // request body
  const { name, cityId, address } = req.body;
  // check id 
  if (!id) {
    throw new ApiErrors(400, 'id is required')
  }
  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid ID')
  }
  // is file is null
  if (!req.file) {
    // Find the document by ID and update it
    const updatedData = await HospitalModel.findByIdAndUpdate(id, { name, address, cityId }, { new: true });
    if (!updatedData) {
      throw new ApiErrors(404, 'Data not found')
    }
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: 'Hospital update successfuly',
      data: updatedData,
    })
    next()
  }
  // file name
  const newFilename: string = (req.file as Express.Multer.File).filename;
  // new file path
  const NewFilePath: String = "/uploads/hospital/" + newFilename;
  // old data get from db
  const oldData = await HospitalModel.findById(id);
  if (!oldData) {
    throw new ApiErrors(404, 'Data not found')
  }
  // Delete old file 
  const oldFilePath = "public/" + oldData.img;
  // Use fs-extra's unlink method to delete the file
  fs.unlink(oldFilePath, (err) => {
    if (err) {
      console.error(`Error deleting file ${oldFilePath}:`, err);
    } else {
      console.log(`File ${oldFilePath} deleted successfully.`);
    }
  });
  // Find the document by ID and update it
  const updatedData = await HospitalModel.findByIdAndUpdate(id, { name, cityId, address, img: NewFilePath }, { new: true });
  if (!updatedData) {
    throw new ApiErrors(404, 'Data not found')
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Hospital updata successfuly',
    data: updatedData,
  })
  next()
})



// ! ====== Delete Hospital =======
const deleteHospital = catchAsync(async (req, res, next) => {
  const id = req.query.id as string;
  if (!id) {
    throw new ApiErrors(400, 'id is required')
  }
  // Check if the ID is valid
  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiErrors(400, 'Invalid ID');
  }
  // old data get from db
  const oldData = await HospitalModel.findById(id);
  if (!oldData) {
    throw new ApiErrors(404, 'Data not found')
  }
  // Delete old file 
  const oldFilePath = "public/" + oldData.img;
  // Use fs-extra's unlink method to delete the file
  fs.unlink(oldFilePath, (err) => {
    if (err) {
      console.error(`Error deleting file ${oldFilePath}:`, err);
    } else {
      console.log(`File ${oldFilePath} deleted successfully.`);
    }
  });
  // Find the document by ID and delete it
  const deletedData = await HospitalModel.findByIdAndDelete(id);

  if (!deletedData) {
    throw new ApiErrors(404, 'Data not found')
  }
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Hospital delete successfuly',
    data: deletedData,
  })
  next()
})




export const HospitalController = {
  createHospital,
  allHospital,
  updateHospital,
  deleteHospital
}