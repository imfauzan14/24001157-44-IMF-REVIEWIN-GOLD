exports.up = function (knex) {
  return knex.schema.createTable("reviews", function (table) {
    table.increments("reviewId").primary();
    table.integer("movieId").notNullable();
    table.string("reviewText", 255).notNullable();
    table.integer("reviewRating").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reviews");
};
