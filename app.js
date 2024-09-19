import express from "express";
import session from "express-session";
import expressEjsLayouts from "express-ejs-layouts";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { fileURLToPath } from "url";
import path from "path";
import passport from "./config/passport.js"; // Import Passport configuration
import prisma from "./config/prismaClient.js"; // shared Prisma Client
import { authRouter } from "./routes/authRoutes.js";
import { navRouter } from "./routes/navRoutes.js";
import { catch404, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Get directory & file names using ES module compatible methods
const __filename = fileURLToPath(import.meta.url); // Correct way to get __filename
const __dirname = path.dirname(__filename); // Correct way to get __dirname

// EJS VIEW TEMPLATE SETUP
// Setup static folder
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Setting Up EJS as the View Engine
app.use(expressEjsLayouts);
app.set("layout");
app.set("view engine", "ejs");
// Setting the Views Directory
app.set("views", path.join(__dirname, "views"));

// END EJS VIEW TEMPLATE SETUP

// Set up session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a secure key in production
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // Check for expired sessions every 2 minutes
      dbRecordIdIsSessionId: true, // Optional: use Prisma Session ID as the Session ID
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(authRouter);
app.use(navRouter);

// ERROR HANDLER
// Catch 404 and forward to the error handler
app.use(catch404);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
