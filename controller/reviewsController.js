const reviewsRepository = require("../repository/reviewsRepository");
const moviesRepository = require("../repository/moviesRepository");

const getMovieDetailsAndReviews = async (req, res) => {
  const movieId = req.params.movieId;
  if (!movieId) {
    throw new Error("movieId query parameter is required");
  }
  try {
    const movieResponse = await moviesRepository.getMovieById(movieId);
    if (!("title" in movieResponse && "overview" in movieResponse)) {
      console.error("Error: Invalid response structure");
      throw new Error("Movie id can't be found");
    }
    const reviews = await reviewsRepository.searchReviews(movieId);
    const response = { movies: [movieResponse], reviews };
    res.render("reviews", response);
  } catch (err) {
    console.error("Error fetching movie and reviews:", err);
    return res.notFound("movieId can't be found");
  }
};

const getReviews = async (req, res) => {
  const movieId = req.params.movieId;
  if (!movieId) {
    throw new Error("movieId query parameter is required");
  }
  try {
    const reviews = await reviewsRepository.searchReviews(movieId);
    if (reviews.length === 0) {
      await res.status(404).json({ error: "no review found" });
    }
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Error fetching movie and reviews:", err);
    if (!res.headersSent) {
      res.status(400).json({ error: "Failed to fetch reviews" });
    }
  }
};

const createReview = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const { reviewText, reviewRating } = req.body;
    if (
      !movieId ||
      !reviewText ||
      reviewText.length > 255 ||
      !reviewRating ||
      reviewRating > 5 ||
      reviewRating < 1
    ) {
      return res.status(400).json({
        error:
          "movieId, reviewRating(int 1-5) and reviewText(str 255 max) is required",
      });
    }
    const reviewData = {
      movieId: movieId,
      reviewText,
      reviewRating,
    };
    await reviewsRepository.createReview(reviewData);
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(404).json({ error: "movieId can't be found" });
  }
};

const createReviewEjs = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    await createReview(req, res).then(() => {
      res.redirect(`/movie/${movieId}`);
    });
  } catch (error) {
    console.error("Error adding review:", err);
    res.serverError("Failed to fetch movie");
  }
};

const createReviewJson = async (req, res) => {
  try {
    const reviewData = await req.body;
    await createReview(req, res).then(() => {
      res.status(200).json(reviewData);
    });
  } catch (err) {
    console.error("Error adding review:", err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to create reviews" });
    }
  }
};

const updateReviewRating = async (req, res) => {
  const movieId = req.params.movieId;
  const reviewId = req.params.reviewId;
  const reviewRating = parseInt(req.body.reviewRating);
  if (!movieId || !reviewId || !reviewRating || reviewRating > 5) {
    return res.status(400).json({
      error: "reviewRating is required and must be within 1 - 5 range",
    });
  }
  try {
    const reviewExists = await reviewsRepository.searchReviewById(reviewId);
    if (!reviewExists) {
      console.error(`No review found for reviewId: ${reviewId}`);
      return res
        .status(404)
        .json({ error: "either movieId or reviewId can't be found" });
    }
    await reviewsRepository.updateReviewRating(reviewId, reviewRating);
    console.log("Review rating updated successfully");
    if (req.method === "POST") {
      res.redirect(`/movie/${movieId}`);
    } else {
      return res
        .status(200)
        .json({ message: "reviewRating updated successfully" });
    }
  } catch (err) {
    console.error("Error:", err);
    res
      .status(404)
      .json({ error: "either movieId or reviewId can't be found" });
  }
};

const deleteReview = async (req, res) => {
  const movieId = req.params.movieId;
  const reviewId = req.params.reviewId;
  if (!movieId || !reviewId) {
    return res
      .status(400)
      .json({ error: "movieId and reviewId parameter is required" });
  }
  try {
    const reviewExists = await reviewsRepository.searchReviewById(reviewId);
    if (!reviewExists) {
      console.error(`No review found for reviewId: ${reviewId}`);
      return res
        .status(404)
        .json({ error: "either movieId or reviewId can't be found" });
    }
    await reviewsRepository.deleteReview(reviewId);
    console.log(`Succesfully deleted reviewId: ${reviewId}`);
    if (req.method === "POST") {
      res.redirect(`/movie/${movieId}`);
    } else {
      return res
        .status(200)
        .json({ message: `Succesfully deleted reviewId: ${reviewId}` });
    }
  } catch (err) {
    console.error("Error deleting review:", err);
    res
      .status(404)
      .json({ error: "either movieId or reviewId can't be found" });
  }
};

module.exports = {
  getMovieDetailsAndReviews,
  getReviews,
  createReview,
  updateReviewRating,
  deleteReview,
  createReviewEjs,
  createReviewJson,
};
