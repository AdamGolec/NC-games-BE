const {
  categories,
  reviews,
  reviewsById,
  comments,
} = require("../models/model");

exports.getCategories = (req, res, next) => {
  categories()
    .then((category) => {
      res.status(200).send({ category });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviews = (req, res, next) => {
  reviews()
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewsById = (req, res, next) => {
  const { review_id } = req.params;
  reviewsById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getComments = (req, res, next) => {
  const { review_id } = req.params;
  comments(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
