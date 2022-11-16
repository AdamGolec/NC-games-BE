const { categories, reviews } = require("../models/model");

exports.getCategories = (req, res, next) => {
  categories()
    .then((category) => {
      res.status(200).send({ category });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res) => {
  reviews()
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};
