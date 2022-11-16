const express = require("express");
const { getCategories, getReviews } = require("./controllers/controller");

const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);

//ERROR HANDLING

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;
