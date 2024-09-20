import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import sessionConfig from "./config/sessionConfig.js";
import { fileURLToPath } from "url";
import path from "path";
import passport from "./config/passport.js"; // Import Passport configuration
import { authRouter } from "./routes/authRoutes.js";
import { navRouter } from "./routes/navRoutes.js";
import {
  catch404,
  fileUploadErrorHandler,
  errorHandler,
} from "./middleware/errorHandler.js";
import fileRouter from "./routes/multerRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Get directory & file names using ES module compatible methods
const __filename = fileURLToPath(import.meta.url); // Correct way to get __filename
const __dirname = path.dirname(__filename); // Correct way to get __dirname

// EJS VIEW TEMPLATE SETUP
// Setup static folder, serve static files
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Setting Up EJS as the View Engine
app.use(expressEjsLayouts); // EJS layouts middleware
app.set("layout");
app.set("view engine", "ejs");
// Setting the Views Directory
app.set("views", path.join(__dirname, "views"));

// END EJS VIEW TEMPLATE SETUP

// Set up session middleware
app.use(sessionConfig);

app.use(passport.session());
// BODY PARSER MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

// USE ROUTES
app.use(authRouter);
app.use(navRouter);
app.use(fileRouter);

// ERROR HANDLING
app.use(fileUploadErrorHandler);
app.use(catch404);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
