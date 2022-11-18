const express = require("express");
const {
  getCategories,
  getReviews,
  getReviewsById,
  getComments,
  postComment,
} = require("./controllers/controller");
const { CustomErrors, PsqlErrors, ServerErrors } = require("./errors/index.js");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewsById);
app.get("/api/reviews/:review_id/comments", getComments);

app.post("/api/reviews/:review_id/comments", postComment);

//ERROR HANDLING

app.use(CustomErrors);
app.use(PsqlErrors);
app.use(ServerErrors);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

module.exports = app;
