const express = require("express");
const cors = require("cors");


const {
  getCategories,
  getReviews,
  getReviewsById,
  getComments,
  getUsers,
  postComment,
  patchReview,
} = require("./controllers/controller");
const { CustomErrors, PsqlErrors, ServerErrors } = require("./errors/index.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get("/api/reviews/:review_id", getReviewsById);
app.get("/api/reviews/:review_id/comments", getComments);
app.get("/api/users", getUsers);

app.post("/api/reviews/:review_id/comments", postComment);

app.patch("/api/reviews/:review_id", patchReview);

//ERROR HANDLING

app.use(CustomErrors);
app.use(PsqlErrors);
app.use(ServerErrors);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Invalid URL" });
});

module.exports = app;
