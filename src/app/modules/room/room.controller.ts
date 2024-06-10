import mongoose from "mongoose";
import ApiErrors from "../../../errors/ApiErrors";
import catchAsync from "../../../utils/catchAsync"
import { RoomModel } from "./room.model";
import { Request, Response, NextFunction } from "express";
import fs from 'fs-extra';
import sendResponse from "../../../utils/sendResponse";


// ! ====== Get  =======
const allRoom = catchAsync(async (req, res, next) => {
    const allData = await RoomModel.find();
    if (!allData) {
        throw new Error('Can not get ')
    }
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Success',
        data: allData,
    })
    next()
})

// ! ====== create  =======
const createRoom = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Check if file is provided
    if (!req.file) {
        throw new ApiErrors(400, 'File is required');
    }

    // Get file name and path
    const filename: string = (req.file as Express.Multer.File).filename;
    const imgPath: string = `/uploads/room/${filename}`;

    // Get request body
    const { name, address, price, goOn, cityId, nearHospitalId } = req.body;

    try {
        // Add to database
        const data = await RoomModel.create({
            name,
            address,
            price,
            goOn,
            cityId,
            nearHospitalId,
            img: imgPath
        });

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
const updateRoom = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id as string;
    // request body
    const { name, address, price, goOn, cityId, nearHospitalId } = req.body;
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
        const updatedData = await RoomModel.findByIdAndUpdate(id, { name, address, price, goOn, cityId, hospitalId: nearHospitalId }, { new: true });
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
    }
    // file name
    const newFilename: string = (req.file as Express.Multer.File).filename;
    // new file path
    const NewFilePath: String = "/uploads/room/" + newFilename;
    // old data get from db
    const oldData = await RoomModel.findById(id);
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
    const updatedData = await RoomModel.findByIdAndUpdate(id, { name, address, price, goOn, cityId, nearHospitalId, img: NewFilePath }, { new: true });
    if (!updatedData) {
        throw new ApiErrors(404, 'Data not found')
    }
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: 'Updata successfuly',
        data: updatedData,
    })
    next()
})



// ! ====== Update  =======
const deleteRoom = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id as string;
    // check id 
    if (!id) {
        throw new ApiErrors(400, 'id is required')
    }
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiErrors(400, 'Invalid ID')
    }
    // old data get from db
    const oldData = await RoomModel.findById(id);
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
    const deletedData = await RoomModel.findByIdAndDelete(id);

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




export const RoomController = {
    createRoom,
    allRoom,
    updateRoom,
    deleteRoom
}