import { body } from "express-validator";

const validateUserSignUp = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ max: 20 })
    .withMessage("Max length of username is 20 character")
    .matches(/^[a-zA-Z0-9_.]+$/)
    .withMessage(
      "Username must contain only letters, numbers, underscores, or periods"
    )
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 1 })
    .withMessage("Password be be at least 4 characters long")
    .isLength({ max: 64 })
    .withMessage("Password must be no more than 64 characters long"),
  // .matches(/[A-Z]/)
  // .withMessage("Password must contain at least one uppercase letter")
  // .matches(/[a-z]/)
  // .withMessage("Password must contain at least one lowercase letter")
  // .matches(/[0-9]/)
  // .withMessage("Password must contain at least one number"),
  body("confirm_password")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

const validateSecret = [
  body("secretq")
    .notEmpty()
    .withMessage("Please enter a value")
    .custom((value) => value.toLowerCase() === "three")
    .withMessage("Not equal to secret")
    .escape(),
];

const validateFolderName = [
  body("foldername")
    .notEmpty()
    .withMessage("Please enter a name for folder")
    .escape(),
];

export { validateUserSignUp, validateSecret, validateFolderName };
