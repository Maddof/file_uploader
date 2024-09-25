import { getAllFoldersByUserId } from "../db/folderQueries.js";
import { getAllFilesInFolderByFolderId } from "../db/queries.js";

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

  // @desc Render single folder view
  // @route GET /folder/:id
  async renderSingleFolder(req, res, next) {
    try {
      const folderId = parseInt(req.params.id); // Extract folderId from URL
      const allFiles = await getAllFilesInFolderByFolderId(folderId);
      console.log(allFiles);
      return res.render("singleFolder", {
        title: "Single Folder",
        errors: null,
        folderId: folderId,
        files: allFiles,
      });
    } catch (err) {
      return next(err);
    }
  },
};

export { nav };
