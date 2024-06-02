const express = require("express");
const router = express.Router();
const reviewsController = require("../controller/reviewsController");

// EJS
router.get("/movie/:movieId", reviewsController.getMovieDetailsAndReviews);
router.post("/movie/:movieId/review", reviewsController.createReviewEjs);
router.post(
  "/movie/:movieId/review/rating/:reviewId/",
  reviewsController.updateReviewRating
);
router.post(
  "/movie/:movieId/review/delete/:reviewId",
  reviewsController.deleteReview
);

// API
router.post("/api/movie/:movieId/review", reviewsController.createReviewJson);
router.get("/api/movie/:movieId/review", reviewsController.getReviews);
router.delete(
  "/api/movie/:movieId/review/:reviewId",
  reviewsController.deleteReview
);
router.patch(
  "/api/movie/:movieId/review/:reviewId/",
  reviewsController.updateReviewRating
);

module.exports = router;
