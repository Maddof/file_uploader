import express from "express";
import {
  validateSignUp,
  validateLogin,
  validateLogout,
} from "../controllers/authController.js";

const authRouter = express.Router();

// Sets local currentuser to current logged in user
authRouter.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

authRouter.post("/newuser", validateSignUp);
authRouter.post("/login", validateLogin);
authRouter.get("/logout", validateLogout);

export { authRouter };
