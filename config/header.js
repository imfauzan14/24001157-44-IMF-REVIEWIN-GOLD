const tmdb = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.MOVIEDB_ACCESS_TOKEN}`,
  },
};

module.exports = { tmdb };
