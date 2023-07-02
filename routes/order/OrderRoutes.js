const express = require("express");
const orderRouter = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../../middlewares/authentication");
const {
  createOrder,
  getAllOrders,
  getCurrentUserOrders,
  getSingleOrders,
  updateOrder,
} = require("../../controllers/order/OrderController");

orderRouter
  .route("/")
  .post(authenticateUser, createOrder)
  .get(authenticateUser, authorizePermissions("admin"), getAllOrders);

orderRouter
  .route("/showallmyorders")
  .get(authenticateUser, authorizePermissions("admin"), getCurrentUserOrders);

orderRouter
  .route("/:id")
  .get(authenticateUser, getSingleOrders)
  .patch(authenticateUser, updateOrder);

module.exports = orderRouter;
