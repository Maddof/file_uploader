import express from "express";
import { createFolder } from "../controllers/folderController.js";

const folderRouter = express.Router();

folderRouter.post("/createfolder", createFolder);

export { folderRouter };
