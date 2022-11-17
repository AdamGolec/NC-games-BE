const express = require("express");
const { getCategories, getReviews, getComments } = require("./controllers/controller");
const {
  CustomErrors,
  PsqlErrors,
  ServerErrors,
} = require('./errors/index.js');


const app = express();

app.get("/api/categories", getCategories);
app.get("/api/reviews", getReviews);
app.get(`/api/reviews/:review_id/comments`, getComments);

//ERROR HANDLING

app.use(CustomErrors);
app.use(PsqlErrors);
app.use(ServerErrors);

// app.all("/*", (req, res) => {
//   res.status(404).send({ msg: "Invalid URL" });
// });



module.exports = app;
