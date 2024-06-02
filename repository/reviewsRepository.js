const knexConfig = require("../config/knexfile");
const knex = require("knex")(knexConfig);

const searchReviews = async (movieId) => {
  try {
    console.log("Fetching reviews for movieId:", movieId);
    const reviews = await knex("reviews").select().where({ movieId: movieId });

    if (!reviews || !reviews.length) {
      console.warn(`No reviews found for movieId: ${movieId}`);
      return [];
    }
    console.log("Reviews fetched successfully");
    return reviews;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
};

const searchReviewById = async (reviewId) => {
  try {
    console.log("Fetching reviews for movieId:", reviewId);
    const reviews = await knex("reviews")
      .select()
      .where({ reviewId: reviewId });

    if (!reviews || !reviews.length) {
      console.warn(`Cant find reviewId: ${reviewId}`);
      return false;
    }
    console.log("Reviews fetched successfully");
    return reviews;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
};

const createReview = async (reviewData) => {
  try {
    console.log("Adding review:", reviewData);
    await knex("reviews").insert(reviewData);
    console.log("Review added successfully");
    return true;
  } catch (error) {
    console.error("Failed to add review:", error);
    throw error;
  }
};

const updateReviewRating = async (reviewId, ratingUpdate) => {
  try {
    await knex("reviews").where({ reviewId: reviewId }).update({
      reviewRating: ratingUpdate,
    });
  } catch (error) {
    console.error("Failed to update rating:", error);
    throw error;
  }
};

const deleteReview = async (reviewId) => {
  try {
    console.log("Deleting review with ID:", reviewId);
    await knex("reviews").where({ reviewId: reviewId }).del();
    console.log("Review deleted successfully");
    return true;
  } catch (error) {
    console.error("Failed to delete review:", error);
    throw error;
  }
};

module.exports = {
  searchReviews,
  searchReviewById,
  createReview,
  updateReviewRating,
  deleteReview,
};
