const express = require("express");
require("dotenv").config();

const moviesRoute = require("./routes/moviesRoute");
const reviewsRoute = require("./routes/reviewsRoute");
const logger = require("morgan");

const app = express();
const port = process.env.APP_PORT;
const setupDatabase = process.env.DB_AUTO_SETUP;

const databaseSetup = require("./middlewares/databaseSetupMiddleware");
const statusCodeMiddleware = require("./middlewares/statusCodeMiddleware");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(statusCodeMiddleware);
app.get("/", (req, res) => res.render("index"));
app.get("/docs/api", (req, res) => res.render("apiDocs"));
app.use(moviesRoute);
app.use(reviewsRoute);

if (setupDatabase == "false") {
  console.log("starting the app without databaseSetup");
  app.listen(port, () => {
    console.log(`Currently running at port http://localhost:${port}`);
  });
} else {
  databaseSetup()
    .then(() => {
      app.listen(port, () => {
        console.log(`Currently running at port http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error("Failed to set up database:", err);
      process.exit(1);
    });
}
