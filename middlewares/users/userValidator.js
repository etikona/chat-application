// External Imports
const { check, validationResult } = require("express-validator");
const createError = require("http-errors");
const path = require("path");
const { unlink } = require("fs");
// add Users
const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: "-" })
    .withMessage("Name can not contain anything other than alphabet")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .custom(async (value) => {
      try {
        const user = await user.findOne({ email: value });
        if (user) {
          throw createError(
            "Email already in use, please provide another email address"
          );
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be valid Bangladeshi number")
    .custom(async (value) => {
      try {
        const user = await user.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already is in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be 8 characters and should be contain al least 1 number, 1 lowercase, 1 uppercase, 1 symbol"
    ),
];

const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // Remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `../../public/upload/avatars/${filename}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
    // Response the errors
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};
module.exports = { addUserValidator, addUserValidationHandler };
