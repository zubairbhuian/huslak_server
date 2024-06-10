import ApiErrors from '../../../errors/ApiErrors';
import catchAsync from '../../../utils/catchAsync'
import sandResponse from '../../../utils/sendResponse'
import sendResponse from '../../../utils/sendResponse';
import { UserModel } from './user.model';
import fs from 'fs-extra';
import jwt from "jsonwebtoken";
import { JWTHelper } from '../../helper/jwt_helper';
import mongoose from 'mongoose';


// ! ====== Get  =======
const allUser = catchAsync(async (req, res, next) => {
  const search = req.query.search || "";
  const cityId = req.query.cityId || "";
  const nearHospitalId = req.query.nearHospitalId || "";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  // hide
  const options = {
    password: 0,
    isAdmin: 0,

  };
  // search RegExp and filter
  const searchRegExp = new RegExp(".*" + search + ".*", "i");
  const cityIdRegExp = new RegExp(".*" + cityId + ".*", "i");
  const nearHospitalIdRegExp = new RegExp(".*" + nearHospitalId + ".*", "i");
  console.log(cityId)
  console.log(nearHospitalId)
  const filter = {
    isAdmin: { $ne: true },
    $or: [
      { name: { $regex: searchRegExp } },
      { email: { $regex: searchRegExp } },
      { phone: { $regex: searchRegExp } },
    ],
  };

  // totale items
  const count = await UserModel.find(filter, options).countDocuments();
  // user find
  const users = await UserModel.find(filter, options)
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


// ! ====== create user  =======
const createUser = catchAsync(async (req, res, next) => {
  // Check if file is provided
  if (!req.file) {
    throw new ApiErrors(400, 'File is required');
  }

  // Get file name and path
  const filename: string = (req.file as Express.Multer.File).filename;
  const imgPath: string = `/uploads/user/${filename}`;
  // Get request body
  const { email, name, phone, password, userType } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new ApiErrors(400, 'Email already exists');
    }
    // Add to database
    const user = await UserModel.create({
      email, name, phone, password, img: imgPath, userType
    });

    // If data is not created, throw an error
    if (!user) {
      throw new Error('Not created');
    }

    // Create a JWT token
    const token = JWTHelper.generateToken(user._id);
    const userWithoutPassword = { _id: user._id, name: user.name, email: user.email, phone: user.phone, addreass: user.address, photoURL: user.img };

    // Send response
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data: userWithoutPassword,
      token
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
})

// ! ====== Login user  =======
const longinUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // check email and password
  if (!email || !password) {
    throw new ApiErrors(400, 'email, and password is required');
  }
  // Check if the user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiErrors(400, 'User not found ,please signUp first');
  }
  // Check if the password is correct
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid password' });
  }
  // Create a JWT token
  const token = JWTHelper.generateToken(user._id);
  const userWithoutPassword = { _id: user._id, name: user.name, email: user.email, phone: user.phone, addreass: user.address, photoURL: user.img };
  // Send response
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Login successful',
    data: userWithoutPassword,
    token
  });
  next();
})

// ! ====== add  user extra info =======
const addUserExtraInfo = catchAsync(async (req, res, next) => {
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

  // const updatedData = await UserModel.findByIdAndUpdate(id, { ...body }, { new: true },);
  const updatedData = await UserModel.findByIdAndUpdate(
    id,
    { ...body },
    { new: true, select: '-password -isAdmin -isBlock' }
  );
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



export const UserController = {
  allUser,
  createUser,
  longinUser,
  addUserExtraInfo
}
