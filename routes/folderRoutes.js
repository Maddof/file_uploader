import express from "express";
import {
  createFolderValidation,
  deleteFolder,
} from "../controllers/folderController.js";

const folderRouter = express.Router();

folderRouter.post("/createfolder", createFolderValidation);
folderRouter.delete("/folders/:id", deleteFolder);

export { folderRouter };
