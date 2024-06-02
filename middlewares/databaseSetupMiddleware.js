const { Client } = require("pg");
const knexConfig = require("../config/knexfile");
const knex = require("knex")(knexConfig);

async function createDatabaseIfNotExists() {
  const client = new Client({
    host: knexConfig.connection.host,
    user: knexConfig.connection.user,
    password: knexConfig.connection.password,
  });

  await client.connect();
  const res = await client.query(
    `SELECT 1 FROM pg_database WHERE datname = '${knexConfig.connection.database}'`
  );
  if (res.rows.length === 0) {
    await client.query(`CREATE DATABASE "${knexConfig.connection.database}"`);
    console.log("Database created");
  } else {
    console.log("Database already exists");
  }
  await client.end();
}

module.exports = async () => {
  await createDatabaseIfNotExists();
  await knex.migrate.latest();
};
