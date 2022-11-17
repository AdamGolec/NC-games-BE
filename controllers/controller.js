const { categories, reviews, comments } = require("../models/model");

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

exports.getComments = (req, res) => {
  const { review_id } = req.params;
  comments(review_id)
    .then((comments) => {
      res.status(200).send({comments});
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};