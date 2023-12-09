// External Import
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");
// Get Login Page
async function getUsers(req, res, next) {
  try {
    const users = await users.find();
    res.render("users", {
      users: "users",
    });
  } catch (err) {
    next(err);
  }
}

// add user
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }
  // Save User
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          message: "Unknown error occurred",
        },
      },
    });
  }
}
// remove user
async function removeUser(req, res, next) {
  try {
    const user = await user.findByIdAndDelete({
      _id: req.params.id,
    });
    // Remove user avatar
    if (user.avatar) {
      unlink(path.join(__dirname, `../public/uploads/avatars/${user.avatar}`));
    }

    res.status(200).json({
      message: "User was removed successfully",
    });
  } catch (err) {
    if (err) {
      console.log(err);
    }
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user",
        },
      },
    });
  }
}
module.exports = {
  getUsers,
  addUser,
  removeUser,
};
