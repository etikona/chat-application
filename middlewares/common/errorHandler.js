const createError = require("http-errors");
// 404 Not found handler
// function notFoundHandler(req, res, next) {
//   next(
//     createError(404, "Your requested content was not found"),
//     console.log(res)
//   );
// }

// Default error handler
// function errorHandler(err, req, res, next) {
//   // res.locals = "Error page"   //Another way to send
//   res.locals.error =
//     process.env.NODE_ENV === "development" ? err : { message: err.message };
//   res.status(err.status || 500);

//   // HTML Response
//   if (res.locals.html) {
//     res.render("error", {
//       title: "Error Page",
//     });
//   }
//   // JSON Response
//   else {
//     res.json(res.locals.error);
//   }

//   //   res.render("error", {
//   //     title: "Error Page",
//   //   });
// }

module.exports = {
  // notFoundHandler,
  // errorHandler,
};
