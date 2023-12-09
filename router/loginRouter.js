// External Imports
const express = require("express");
const router = express.Router();
// Internal Imports
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

const page_title = "Login";
// login page
router.get("/", decorateHtmlResponse(page_title), getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

module.exports = router;
