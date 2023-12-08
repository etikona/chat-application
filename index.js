// External Imports
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const inboxRouter = require("./router/inboxRouter");

// Internal Imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log(err));

// Request parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set view engine
app.set("view engine", "ejs");

// Set static folder
// app.set(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public")));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Routing setup
app.use("/", loginRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);

// 404 Not Found handling
app.use(notFoundHandler);

// Common error handler
app.use(errorHandler);

// Listening port
app.listen(process.env.PORT, () => {
  console.log(`App listening on ${process.env.PORT}`);
});
