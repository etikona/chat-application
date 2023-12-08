function avatarUpload(req, res, next) {
  const uploader = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    "Only .jpeg , .jpg, and .png format allowed"
  );

  // Call the middleware functions
  upload.any()(req, res, (err) => {
    if (err) {
      res.status.json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}
module.exports = avatarUpload;
