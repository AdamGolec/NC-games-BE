const db = require("../db/connection.js");

exports.categories = () => {
  return db.query("SELECT * FROM categories").then((result) => result.rows);
};

exports.reviews = () => {
  return db
    .query(
      `
        SELECT owner,
        title,
        reviews.review_id,
        review_img_url,
        category,
        reviews.created_at,
        reviews.votes,
        designer, 
        COUNT(comments.comment_id) AS comment_count 
        FROM reviews 
        LEFT JOIN comments ON comments.review_id = reviews.review_id 
        GROUP BY reviews.review_id
        ORDER BY created_at DESC
      `
    )
    .then((result) => result.rows);
};

exports.reviewsById = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
    .then((result) => {
      if (!result.rows[0]) {
        return Promise.reject({
          status: 404,
          msg: `ID ${review_id} does not exist`,
        });
      }
      return result.rows[0];
    });
};

exports.comments = (review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `ID ${review_id} does not exist`,
        });
      } else {
        return db
          .query(
            `SELECT * 
          FROM comments
          WHERE review_id=$1 
          ORDER BY comments.created_at DESC;`,
            [review_id]
          )
          .then((result) => {
            return result.rows;
          });
      }
    });
};
