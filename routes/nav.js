import express from "express";

const navRouter = express.Router();

navRouter.get("/", (req, res, next) => {
  try {
    res.render("index", { title: "Home" });
  } catch (error) {
    return next(error);
  }
});

export { navRouter };
