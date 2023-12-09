// Internal Imports
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/People");

// Get Login Page
function getLogin(req, res, next) {
  res.render("index");
}

async function login(req, res, next) {
  try {
    // Find a user who has this email/number
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        // prepare the user object to generate token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };
        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set Logged in use local identifier
        res.locals.loggedInUser = userObject;
        res.render("inbox");
      } else {
        throw createError("Failed to login!! Please try again");
      }
    } else {
      throw createError("Failed to login!! Please try again");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

module.exports = {
  getLogin,
  login,
};
