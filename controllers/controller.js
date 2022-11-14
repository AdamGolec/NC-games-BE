const { categories } = require("../models/model");

exports.newMessage = (req, res, next) => {
  res.send({ message: "all ok" }).status(200);
};

exports.getCategories = (req, res) => {
  categories().then((category) => {
    res.status(200).send({ category });
  });
};
