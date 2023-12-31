// External Imports
const express = require("express");
const router = express.Router();
// Internal Imports
const { getLogin, login, logout } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { redirectLoggedIn } = require("../middlewares/common/checkLogin");
// Common page title
const page_title = "Login";
// login page
router.get("/", decorateHtmlResponse(page_title), redirectLoggedIn, getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

// Logout router
router.delete("/", logout);
module.exports = router;
