const reviews = [
  { reviewText: "Great movie!", reviewRating: 5, movieId: 557 },
  {
    reviewText: "Not bad, but could be better.",
    reviewRating: 3,
    movieId: 557,
  },
];

exports.seed = function (knex) {
  return knex("reviews").insert(reviews);
};
