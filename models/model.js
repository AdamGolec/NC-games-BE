const db = require('../db/connection.js');

exports.categories = () => {
    return db.query('SELECT * FROM categories')
    .then((result) => result.rows);
};