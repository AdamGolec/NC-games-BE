const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const db = require("../db/connection.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => db.end());

describe("/api/categories", () => {
  test("GET - 200: responds with an array of category objects, each of which should have properties: slug, description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.category).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            }),
          ])
        );
      });
  });

  test("GET - 404: Invalid Path", () => {
    return request(app)
      .get("/api/categoriesbadurl")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid URL");
      });
  });
});

describe("/api/reviews", () => {
  test("GET - 200: responds with array of review objects", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.review.length).toBeGreaterThan(0);
        body.review.forEach((review) => {
          expect(review).toEqual({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });

  test("GET - 200: array of reviews sorted in descending order by date", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("/api/reviews/:review_id", () => {
  test("GET - 200: responds with a single matching review", () => {
    const idOfReview = 3;
    return request(app)
      .get(`/api/reviews/${idOfReview}`)
      .expect(200)
      .then(({ body }) => {
        // console.log(body);
        expect(body.review).toEqual(
          expect.objectContaining({
            review_id: idOfReview,
            title: "Ultimate Werewolf",
            review_body: "We couldn't find the werewolf!",
            designer: "Akihisa Okui",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            votes: 5,
            category: "social deduction",
            owner: "bainesface",
            created_at: "2021-01-18T10:01:41.251Z",
          })
        );
      });
  });

  test('GET - 404: ID does not exist', () => {
    return request(app)
      .get('/api/reviews/99999')
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('ID 99999 does not exist');
      });
  });
  
  test('GET - 400: Invalid input', () => {
    return request(app)
      .get('/api/reviews/notID')
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Invalid input');

      });
    });
});
  
describe("/api/reviews/:review_id/comments", () => {
  test("GET - 200: responds with array of comments for given review_id", () => {
  const idOfReview = 2;
  return request(app)
  .get(`/api/reviews/${idOfReview}/comments`)
  .expect(200)
  .then(({ body }) => {
    expect(body.comments.length).toBeGreaterThan(0);
    body.comments.forEach((comment) => {
      expect(comment).toEqual(
        expect.objectContaining({
          review_id: idOfReview,
            author: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            body: expect.any(String),
            comment_id: expect.any(Number),
          })
          );
        });
      });
    });
});