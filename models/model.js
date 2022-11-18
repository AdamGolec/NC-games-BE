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

exports.insertComment = ({ body, username }, review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `ID ${review_id} does not exist`,
        });
      } else if (username === "" || body === "") {
        return Promise.reject({
          status: 400,
          msg: `Missing input`,
        });
      } else {
        return db
          .query("SELECT * FROM users WHERE username = $1;", [username])
          .then((res) => {
            if (res.rows.length === 0) {
              return Promise.reject({
                status: 400,
                msg: `Username ${username} does not exist`,
              });
            } else {
              return db
                .query(
                  `INSERT INTO comments (body, author, review_id) 
              
              VALUES ($1, $2, $3) RETURNING*;
              `,
                  [body, username, review_id]
                )
                .then((result) => {
                  return result.rows[0];
                });
            }
          });
      }
    });
};

exports.updateVote = ({ inc_votes }, review_id) => {
  return db
    .query("SELECT * FROM reviews WHERE review_id = $1;", [review_id])
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `ID ${review_id} does not exist`,
        });
      } else if (!inc_votes) {
        return Promise.reject({
          status: 400,
          msg: `Missing input`,
        });
      } else if (typeof inc_votes !== "number") {
        return Promise.reject({
          status: 400,
          msg: `Invalid input type`,
        });
      } else {
        return db
          .query(
            `
          UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;
          `,
            [inc_votes, review_id]
          )
          .then((result) => {
            return result.rows[0];
          });
      }
    });
};
