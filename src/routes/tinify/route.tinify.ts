// External import
import express from "express";

// Internal import
import {compressFromFile,compressFromBuffer } from "../../controllers/tinify/controller.Tinify";
import { fileUpload, fileWriteLocally, CompressFileAndWriteLocally } from "../../middlewares/common/fileUpload";
import { JwtAuthentication } from "../../middlewares/common/jwt.varification";

const authentication = JwtAuthentication.getInstance().authenticateUser;
const lamaAiRoute = express.Router();

// Server for lama
lamaAiRoute.post('/', fileUpload.fields([{name: 'imageFiles', maxCount: 10}]), fileWriteLocally, compressFromFile)
lamaAiRoute.post('/from-buffer', fileUpload.fields([{name: 'imageFiles', maxCount: 10}]), CompressFileAndWriteLocally, compressFromBuffer)


export = lamaAiRoute;

