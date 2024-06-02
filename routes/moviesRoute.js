const express = require("express");
const router = express.Router();
const movieController = require("../controller/moviesController");

// EJS
router.get("/search", movieController.getMoviesEjs);

// API
router.get("/api/movie/search", movieController.getMoviesJson);
router.get("/api/movie/:movieId", movieController.getMovieDetailsJson);

module.exports = router;
