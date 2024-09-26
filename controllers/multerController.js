import { cloudinary } from "../config/cloudinaryConfig.js";
import { file } from "../db/fileQueries.js";
import { getFolderById } from "../db/folderQueries.js";
import fs from "fs";

const uploadFile = async (req, res) => {
  try {
    // File is stored in req.file
    if (!req.file || !req.body.folderId) {
      return res.status(400).render("error", {
        title: "File upload error",
        errors: [{ msg: "No file uploaded or folder Id missing" }],
        message: "No file uplaoded or folder id missing",
        status: 400,
      });
    }

    const folderId = parseInt(req.body.folderId);
    console.log("Folder id is(body): " + folderId);
    console.log("Folder id is(params): " + req.params.folderId);
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "my-folder-test", // Optional folder on Cloudinary
      use_filename: true, // Use the original filename
    });

    // Save file information in DB

    const newFile = {
      name: req.file.originalname,
      url: result.secure_url,
      bytes: result.bytes,
      folderId: folderId,
      public_id: result.public_id,
    };

    await file.saveFile(newFile);

    // Remove the file from local disk
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    const allFiles = await file.getAllFilesInFolderByFolderId(folderId);
    const folder = await getFolderById(folderId);

    res.status(200).render("singleFolder", {
      title: folder.name,
      folderId: folderId,
      files: allFiles,
      errors: null,
    });
  } catch (error) {
    console.error("File upload Error:", error); // Log the error

    return res.status(500).render("error", {
      title: "Error!",
      errors: [{ msg: "Error occured during file upload" }],
      message: "Error occured during file upload",
      status: 500,
    });
  }
};

export { uploadFile };
