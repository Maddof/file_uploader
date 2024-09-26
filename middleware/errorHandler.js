import { file } from "../db/fileQueries.js";

// catch404 Middleware
const catch404 = (req, res, next) => {
  res.status(404).render("error", {
    title: "404 not found",
    message: "Page not found",
    status: 404,
  });
};

// Will catch errors from Multer and send them to the view and render where
// partials/errors.ejs is included
const fileUploadErrorHandler = (err, req, res, next) => {
  const folderId = parseInt(
    req.body.folderId || req.params.folderId || req.query.folderId
  );

  console.log(req);
  console.log(req.params);

  console.log("Folder id (error) was: " + folderId);
  const allFiles = file.getAllFilesInFolderByFolderId(folderId);
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.render("error", {
      title: "Error",
      folderId: folderId,
      files: allFiles,
      errors: [{ msg: "File size exceeds limit" }],
      message: "File exceeds limit",
      status: 400,
    });
  }

  if (err.message === "Only images are allowed") {
    return res.render("error", {
      title: "Error",
      folderId: folderId,
      files: allFiles,
      errors: [{ msg: err.message }],
      message: "Only images allowed",
      status: 400,
    });
  }
  next(err);
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Error for other errors

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error"; // Default message

  // For regular HTML routes, render an error page
  res.status(statusCode).render("error", {
    title: "Error",
    message: message,
    status: statusCode,
  });
};

export { catch404, fileUploadErrorHandler, errorHandler };
