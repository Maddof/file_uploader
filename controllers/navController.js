import { getAllFoldersByUserId } from "../db/folderQueries.js";

// const allFoldersByUserId = await nav.getAllFoldersByUserId(req.user.id);

const nav = {
  // @desc Render homepage (index) page
  // @route GET /
  async renderIndex(req, res, next) {
    try {
      let allFoldersByUserId = [];

      if (req.user) {
        allFoldersByUserId = await getAllFoldersByUserId(req.user.id);
      }
      console.log(allFoldersByUserId);
      res.render("index", {
        title: "Home",
        errors: null,
        folders: allFoldersByUserId,
      });
    } catch (err) {
      return next(err);
    }
  },
  // @desc Render signup page
  // @route GET /sign-up
  renderSignUp(req, res, next) {
    try {
      res.render("signup", {
        title: "Signup",
        errors: null,
      });
    } catch (err) {
      return next(err);
    }
  },

  // @desc Render login
  // @route GET /login
  renderLogin(req, res, next) {
    try {
      res.render("login", {
        title: "Login",
        errors: null,
      });
    } catch (err) {
      return next(err);
    }
  },

  // @desc Render dashboard
  // @route GET /dashboard
  renderDashboard(req, res, next) {
    try {
      res.render("dashboard", {
        title: "Dashboard",
        errors: null,
      });
    } catch (err) {
      return next(err);
    }
  },

  // @desc Render file upload
  // @route GET /fileupload
  renderFileUpload(req, res, next) {
    try {
      res.render("fileupload", {
        title: "File uploader",
        errors: null,
      });
    } catch (err) {
      return next(err);
    }
  },
};

export { nav };
