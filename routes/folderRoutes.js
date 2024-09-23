import express from "express";
import {
  createFolderValidation,
  deleteFolder,
  renameFolder,
} from "../controllers/folderController.js";

const folderRouter = express.Router();

folderRouter.post("/createfolder", createFolderValidation);
folderRouter.post("/editfolder", renameFolder);

folderRouter.delete("/folders/:id", deleteFolder);

export { folderRouter };
