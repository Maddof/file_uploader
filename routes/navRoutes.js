import express from "express";
import { nav } from "../controllers/navController.js";

const navRouter = express.Router();

navRouter.get("/", nav.renderIndex);
navRouter.get("/sign-up", nav.renderSignUp);
navRouter.get("/login", nav.renderLogin);
navRouter.get("/fileupload", nav.renderFileUpload);

navRouter.get("/dashboard", nav.renderDashboard);

export { navRouter };
