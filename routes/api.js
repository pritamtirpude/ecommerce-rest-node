const express = require("express");

const authRouter = require("./auth/AuthRoutes");
const usersRouter = require("./users/UsersRoutes");
const productRouter = require("./product/ProductRoutes");
const reviewRouter = require("./review/ReviewRoutes");
const orderRouter = require("./order/OrderRoutes");

const api = express.Router();

api.use("/auth", authRouter);
api.use("/user", usersRouter);
api.use("/products", productRouter);
api.use("/reviews", reviewRouter);
api.use("/orders", orderRouter);

module.exports = api;
