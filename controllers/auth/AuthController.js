const User = require("../../models/user/User");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../../errors");
const { attachCookiesToResponse, createTokenUser } = require("../../utils");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError("Email already exists.");
  }

  // first registered user is a admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const tokenUser = createTokenUser(user).attachCookiesToResponse({
    res,
    user: tokenUser,
  });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid Credentials");
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logoutController = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ message: "loged out successfully" });
};

module.exports = {
  registerController,
  loginController,
  logoutController,
};
