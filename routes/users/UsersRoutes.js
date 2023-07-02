const express = require("express");

const usersRouter = express.Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../../controllers/users/UserController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../../middlewares/authentication");

usersRouter
  .route("/")
  .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

usersRouter.route("/showMe").get(authenticateUser, showCurrentUser);
usersRouter.route("/updateUser").patch(authenticateUser, updateUser);
usersRouter
  .route("/updateUserPassword")
  .patch(authenticateUser, updateUserPassword);

usersRouter.route("/:id").get(authenticateUser, getSingleUser);

module.exports = usersRouter;
