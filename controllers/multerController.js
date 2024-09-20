export const uploadFile = (req, res) => {
  try {
    // File is stored in req.file
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.status(200).json({
      message: "File uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
