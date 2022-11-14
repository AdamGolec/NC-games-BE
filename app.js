const express = require('express');
const { getCategories, newMessage } = require('./controllers/controller');

const app = express();
app.use(express.json());

app.get("/api", newMessage);

app.get('/api/categories', getCategories);



//ERROR HANDLING

app.all("/*", (req, res) => {
    res.status(404).send({ msg: "Invalid URL" });
  });

module.exports = app;