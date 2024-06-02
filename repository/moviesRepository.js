const header = require("../config/header");
const fetch = require("node-fetch");

const getMovies = async (title) => {
  try {
    console.log("Fetching movies with this title:", title);
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      title
    )}`;
    const response = await fetch(url, header.tmdb);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("Movies fetched successfully");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    throw error;
  }
};

const getMovieById = async (movieId) => {
  try {
    console.log("Fetching movieId:", movieId);
    const url = `https://api.themoviedb.org/3/movie/${movieId}`;
    const response = await fetch(url, header.tmdb);
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
    }
    console.log("movieId fetched successfully");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch movieId:", error);
    throw error;
  }
};

module.exports = { getMovies, getMovieById };
