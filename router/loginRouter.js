// External Imports
const express = require("express");
const router = express.Router();
// Internal Imports
const { getLogin, login } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// login page
router.get("/", decorateHtmlResponse("Login"), getLogin);

// process login
router.post("/", doLoginValidators, doLoginValidationHandler, login);

module.exports = router;
