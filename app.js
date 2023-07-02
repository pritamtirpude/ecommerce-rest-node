const express = require("express");
require("express-async-errors");

const notFound = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error-handler");
const api = require("./routes/api");

const app = express();

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static("./public"));
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("<h1>E-Commerce API</h1>");
});

app.get("/api/v1/", (req, res) => {
  console.log(req.signedCookies);
  res.send("<h1>E-Commerce API</h1>");
});

app.use("/api/v1/", api);

app.use(notFound);
app.use(errorMiddleware);

module.exports = app;
