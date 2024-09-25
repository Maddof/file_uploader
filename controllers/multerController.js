import { cloudinary } from "../config/cloudinaryConfig.js";
import { saveFile } from "../db/queries.js";
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

    const folderId = req.body.folderId;

    console.log(folderId);

    // Save file information in Prisma
    const newFile = await prisma.file.create({
      data: {
        name: req.file.originalname,
        url: "result.secure_url", // Cloudinary URL
        folderId: parseInt(folderId), // Associate with the correct folder
      },
    });

    // Save file to db
    await saveFile(newFile);

    /*
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "my-folder-test", // Optional folder on Cloudinary
      use_filename: true, // Use the original filename
    });

    
    console.log(result);
    */
    // Remove the file from local disk
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    // If upload is successful, return the file URL
    res.status(200).render("singleFolder", {
      title: "File uploaded",
      folderId: folderId,
      // url: result.secure_url, // Cloudinary file url
      errors: null,
    });
  } catch (error) {
    console.error("File upload Error:", error); // Log the error

    return res.status(500).render("fileupload", {
      title: "Error!",
      errors: [{ msg: "Error occured during file upload" }],
    });
  }
};

export { uploadFile };
