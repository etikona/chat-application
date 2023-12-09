const express = require("express");

const router = express.Router();
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/userController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  addUserValidationHandler,
} = require("../middlewares/users/userValidator");

router.get("/", decorateHtmlResponse("Users"), getUsers);
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidationHandler,
  addUser
);
// Remove User
router.delete("/:id", removeUser);
module.exports = router;
