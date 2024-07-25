import fs from 'fs-extra';
import multer from 'multer';


// Function to delete file asynchronously if it exists
export const deleteFile = async (filePath: string) => {
  const fullPath = `public${filePath}`;
  if (fs.existsSync(fullPath)) {
    try {
      await fs.unlink(fullPath);
      console.log(`File ${fullPath} deleted successfully.`);
    } catch (err) {
      console.error(`Error deleting file ${fullPath}:`, err);
    }
  } else {
    console.warn(`File ${fullPath} does not exist.`);
  }
};



export const storage = (destination: string) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public${destination}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const limits = {
  fileSize: 3 * 1024 * 1024, // 3MB
};

export const fileFilter = (req: any, file: any, cb: any) => {
  // Accept image files only
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};
