import multer from "multer";
import path from 'path';


function storage(destination:string) {
    return multer.diskStorage({
      destination: destination,
      filename: function (req, file, cb) {
        // Ensure the file extension is .png or .jpg
        const allowedExtensions = ['.png', '.jpg'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
          // Create a unique filename
          const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
          // Set filename to be unique + original extension
          cb(null, file.fieldname + '_' + uniqueSuffix + ext);
        } else {
          cb(new Error('Only .png and .jpg files are allowed!'),"Err");
        }
      }
    });
  }


  export const FileUpload = {
    storage,
  }
  
