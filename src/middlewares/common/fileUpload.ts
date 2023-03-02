// External import
import fs from "fs";
import multer from "multer";

// Internal import
import { alphNumericName } from "../../utilities/generateUniqueName";

const fileStorage = multer.memoryStorage();

export const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req: any, file, cb) {
    if (!file?.originalname?.match(/\.(png|jpg|jpeg|webp)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please select png, jpg or jpeg Image Only"));
    }
    cb(undefined, true);
  },
});

// check for File upload
export const fileWriteLocally = (req: any, res: any, next: any) => {
  let hasError: any;
  try {
    const dirPath = `./uploaded-image/tiny/${new Date()
      .getTime()
      .toString()}_${alphNumericName()}`;
    req.dirPath = dirPath;
    req.imgFileName = [];

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const Files = req?.files?.imageFiles;
    for (const file of Files) {
      const fileContents = Buffer.from(file.buffer, "base64");
      const filePath = dirPath + '/' + file.originalname;
      fs.writeFileSync(filePath, fileContents);
      req.imgFileName.push(file.originalname);
    }
  } catch (error) {
    hasError = error;
  } finally {
    if (hasError) {
      req.error = hasError;
      next()
    } else {
      next();
    }
  }
};

/** Compress File And WriteLocally */
import tinify from 'tinify';
export const CompressFileAndWriteLocally = async (req: any, res: any, next: any) => {
  let hasError: any;
  try {
    const dirPath = `./uploaded-image/tiny/${new Date()
      .getTime()
      .toString()}_${alphNumericName()}/output`;
    req.dirPath = dirPath;
    req.imgFileName = [];

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const Files = req?.files?.imageFiles;
    for (const file of Files) {
      const fileContents = Buffer.from(file.buffer, "base64");
      const filePath = dirPath + '/' + file.originalname;
      const resultData:any = await tinify.fromBuffer(fileContents).toBuffer().catch((error) =>{
        throw error;
      });
      fs.writeFileSync(filePath, resultData);
      req.imgFileName.push(filePath.split('uploaded-image')[1]);
    }
  } catch (error) {
    hasError = error;
  } finally {
    if (hasError) {
      req.error = hasError;
      next()
    } else {
      next();
    }
  }
};

