const express = require("express");

const authRouter = express.Router();

const {
  loginController,
  logoutController,
  registerController,
} = require("../../controllers/auth/AuthController");

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/logout", logoutController);

module.exports = authRouter;
