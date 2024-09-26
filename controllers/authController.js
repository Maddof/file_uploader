import bcrypt from "bcryptjs";
import passport from "passport";
import { validationResult } from "express-validator";
import { validateUserSignUp } from "./validations.js";
import { getUserByUsername, createUser } from "../db/queries.js";

// @desc Validate signup, hash pass and redirect to home
// @route POST
const validateSignUp = [
  validateUserSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);
    let allErrors = errors.array();

    try {
      // Check for unique user already existing

      const userExist = await getUserByUsername(req.body.username);
      // const userExist = await checkUniqueUser(req.body.username);
      console.log(req.body.username);
      console.log(userExist);
      if (userExist) {
        allErrors.push({ msg: "Username already exists" }); // Add the error for existing username
      }

      // If there are any errors (validation or username exists), render the form with errors
      if (allErrors.length > 0) {
        return res.status(400).render("signup", {
          title: "Sign Up error",
          errors: allErrors,
        });
      }

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Insert the new user into the database
      await createUser(req.body.username, hashedPassword);

      console.log("Successfull creation");
      // Redirect after successful signup
      res.redirect("/");
    } catch (err) {
      console.error("Signup Error:", err.message); // Log the error
      return res.render("signup", {
        title: "Sign up error",
        errors: [{ msg: "Error occured during signup" }],
      });
    }
  },
];

// @desc Login user and redirect based on state
// @route POST /log-in
const validateLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      // If authentication fails, render the login page with the error message
      return res.render("login", {
        title: "Login",
        messages: [info.message], // Capture the error message from Passport
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect("/"); // On successful login, redirect to the index page (home)
    });
  })(req, res, next);
};

// @desc Logout user and redirect to index
// @route GET /
const validateLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

export { validateSignUp, validateLogin, validateLogout };
