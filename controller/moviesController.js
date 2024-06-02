const moviesRepository = require("../repository/moviesRepository");

const getMovies = async (req, res) => {
  const movieTitle = req.query.title;
  if (!movieTitle) {
    console.error("title query parameter is required");
  }
  try {
    const moviesResponse = await moviesRepository.getMovies(movieTitle);
    return moviesResponse;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getMoviesEjs = async (req, res) => {
  try {
    getMovies(req, res).then((moviesResponse) => {
      res.render("movies", { movies: moviesResponse.results });
    });
  } catch (error) {
    res.serverError("Failed to fetch movies");
  }
};

const getMoviesJson = async (req, res) => {
  try {
    await getMovies(req, res).then((moviesResponse) => {
      console.log(moviesResponse);
      if (moviesResponse.results.length == 0) {
        return res.status(404).json(moviesResponse);
      }
      res.status(200).json(moviesResponse);
    });
  } catch (error) {
    return res.status(500).json(`Failed to fetch movies, Error: ${error}`);
  }
};

const getMovieDetailsJson = async (req, res) => {
  const movieId = req.params.movieId;
  if (!movieId) {
    console.error("movieId parameter is required");
    return res.status(400).json("Missing movieId parameter");
  }

  try {
    const movieResponse = await moviesRepository.getMovieById(movieId);
    if (!("title" in movieResponse && "overview" in movieResponse)) {
      console.error("Error: Invalid response structure");
      return res.status(400).json("Movie id can't be found");
    }
    res.status(200).json(movieResponse);
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json("Failed to fetch movie");
  }
};

module.exports = {
  getMovies,
  getMoviesEjs,
  getMoviesJson,
  getMovieDetailsJson,
};
