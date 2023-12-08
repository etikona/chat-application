const express = require("express");

const router = express.Router();
const { getUsers } = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const addUserValidator = require("../middlewares/users/userValidator");

router.get("/", decorateHtmlResponse("Users"), getUsers);
router.post("/", avatarUpload, addUserValidator);
module.exports = router;
