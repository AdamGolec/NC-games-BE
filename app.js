const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewsById,
} = require("./controllers/controller");

const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewsById);

//ERROR HANDLING

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

app.use((err, req, res, next) => {
  console.log(err.msg);
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Invalid input' });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error!");
});

module.exports = app;
