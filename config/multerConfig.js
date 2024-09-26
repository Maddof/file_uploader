import multer from "multer";
import path from "path";

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder where files will be saved
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // Use the original filename, or customize it if needed
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Set up Multer with the defined storage configuration
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  fileFilter: (req, file, cb) => {
    // Optionally filter files by type (e.g., only allow images)
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (extname && mimeType) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

export default upload;
