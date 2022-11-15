const { categories } = require("../models/model");

exports.getCategories = (req, res, next) => {
  categories().then((category) => {
    res.status(200).send({ category });
  })
  .catch((err) => {
    next(err);
  });
};
