import express from "express";
import upload from "../config/multerConfig.js"; // Multer configuration
import { uploadFile } from "../controllers/multerController.js"; // Upload controller

const fileRouter = express.Router();

// File upload route (uses single file upload)
fileRouter.post("/upload", upload.single("file"), uploadFile);

export default fileRouter;
