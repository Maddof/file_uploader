export const uploadFile = (req, res) => {
  try {
    // File is stored in req.file
    if (!req.file) {
      return res.status(400).render("fileupload", {
        title: "File upload error",
        errors: [{ msg: "No file uploaded" }],
      });
    }

    res.status(200).render("fileupload", {
      title: "File uploaded",
      errors: null,
    });
  } catch (error) {
    console.error("File upload Error:", err.message); // Log the error

    return res.status(500).render("fileupload", {
      title: "Error!",
      errors: [{ msg: "Error occured during file upload" }],
    });
  }
};
