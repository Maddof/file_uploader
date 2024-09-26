import { file } from "../db/fileQueries.js";
import { cloudinary } from "../config/cloudinaryConfig.js";

// @desc Delete file via front-end fetch
// @route DELETE /file/:id
const deleteFile = async (req, res, next) => {
  const fileId = parseInt(req.params.id);
  const currentFile = await file.getFileById(fileId);
  const currentPublicId = currentFile.public_id;
  try {
    // Delete the file from Cloudinary
    await cloudinary.uploader.destroy(currentPublicId, { invalidate: true });

    // Now delete the file from the database
    await file.deleteFileById(fileId);
    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting File", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export { deleteFile };
