import { validateFolderName } from "./validations.js";
import { validationResult } from "express-validator";

// @desc Create folder
// @route POST /createfolder
const createFolder = [
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
    console.log("Folder name:", folderName);
    // Assuming req.user contains the authenticated user
    console.log("Current user:", req.user);

    // If folder creation is successful
    console.log("Folder successfully created");
    return res.redirect("/");
  },
];

export { createFolder };
