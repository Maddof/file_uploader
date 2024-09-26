import { cloudinary } from "../config/cloudinaryConfig.js";
import { file } from "../db/fileQueries.js";
import prisma from "../config/prismaClient.js";
import fs from "fs";

const uploadFile = async (req, res) => {
  try {
    // File is stored in req.file
    if (!req.file || !req.body.folderId) {
      return res.status(400).render("fileupload", {
        title: "File upload error",
        errors: [{ msg: "No file uploaded or folder Id missing" }],
      });
    }

    const folderId = parseInt(req.body.folderId);

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "my-folder-test", // Optional folder on Cloudinary
      use_filename: true, // Use the original filename
    });

    // Save file information in Prisma

    const newFile = {
      name: req.file.originalname,
      url: result.secure_url,
      bytes: result.bytes,
      folderId: folderId,
      public_id: result.public_id,
    };

    console.log(result);

    console.log(newFile);

    // Save file to db
    await file.saveFile(newFile);

    // Remove the file from local disk
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    // If upload is successful, return the file URL
    const allFiles = await file.getAllFilesInFolderByFolderId(folderId);

    res.status(200).render("singleFolder", {
      title: "File uploaded",
      folderId: folderId,
      files: allFiles,
      errors: null,
    });
  } catch (error) {
    console.error("File upload Error:", error); // Log the error

    return res.status(500).render("error", {
      title: "Error!",
      errors: [{ msg: "Error occured during file upload" }],
    });
  }
};

export { uploadFile };
