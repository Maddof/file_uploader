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
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.render("fileupload", {
      title: "Error",
      errors: [{ msg: "File size exceeds limit" }],
    });
  }

  if (err.message === "Only images are allowed") {
    return res.render("fileupload", {
      title: "Error",
      errors: [{ msg: err.message }],
    });
  }

  // For any other errors
  return res.render("fileupload", {
    title: "Error",
    errors: [{ msg: "An unexpected error occured" }],
  });
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
