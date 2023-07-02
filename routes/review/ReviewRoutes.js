const express = require("express");

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../../controllers/review/ReviewController");
const { authenticateUser } = require("../../middlewares/authentication");

const reviewRouter = express.Router();

reviewRouter.route("/").post(authenticateUser, createReview).get(getAllReviews);

reviewRouter
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

module.exports = reviewRouter;
