// External Imports
const { check } = require("express-validator");

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
          throw createHttpError(
            "Email already in use, please provide another email address"
          );
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Mobile number must be valid Bangladeshi number")
    .custom(async (value) => {
      try {
        const user = await user.findOne({ mobile: value });
        if (user) {
          throw createHttpError("Mobile already is in use");
        }
      } catch (err) {
        throw createHttpError(err.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be 8 characters and should be contain al least 1 number, 1 lowercase, 1 uppercase, 1 symbol"
    ),
];

module.exports = addUserValidator;
