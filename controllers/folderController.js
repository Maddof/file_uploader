import { validateFolderName } from "./validations.js";
import { validationResult } from "express-validator";
import {
  createFolder,
  deleteFolderById,
  renameFolderById,
} from "../db/folderQueries.js";

// @desc Create folder
// @route POST /createfolder
const createFolderValidation = [
  validateFolderName,
  async (req, res, next) => {
    const errors = validationResult(req);
    let allErrors = errors.array();

    // If there are any errors (validation or username exists), render the form with errors
    if (allErrors.length > 0) {
      return res.status(400).render("error", {
        title: "Error with folder creation",
        message: "Error with folder creation: ",
        status: 400,
        errors: allErrors,
      });
    }

    // Process folder creation logic (e.g., saving to the database)
    const folderName = req.body.foldername;
    const userId = req.user.id;

    await createFolder(userId, folderName);
    // If folder creation is successful
    console.log("Folder successfully created");
    return res.status(200).redirect("/");
  },
];
// @desc Delete folder via front-end fetch
// @route DELETE /folders/:id
const deleteFolder = async (req, res, next) => {
  console.log(req.params);
  const folderId = parseInt(req.params.id);
  try {
    const result = await deleteFolderById(folderId);
    return res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    console.error("Error deleting folder", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Edit (rename) folder
// @route POST /editfolder
const renameFolder = [
  validateFolderName,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("error", {
        title: "Error with folder rename",
        message: "Error with folder rename",
        status: 400,
        errors: errors.array(),
      });
    }
    console.log(req.body);
    const folderId = parseInt(req.body.folderId);
    const folderName = req.body.foldername;
    try {
      const result = await renameFolderById(folderId, folderName);
      console.log(result);
      return res.redirect("/");
    } catch (error) {
      console.error("Error editing folder", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
];

export { createFolderValidation, deleteFolder, renameFolder };
