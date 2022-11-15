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
        // console.log(body.review);
        body.review.forEach(review => { 
          expect(review).toEqual({
            owner: expect.any(String),
            title: expect.any(String),
            review_id: expect.any(Number),
            category: expect.any(String),
            review_img_url: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            designer: expect.any(String),
            comment_count: expect.any(String)
          })
        });
      });
  });

  test("GET - 200: array of reviews sorted in descending order by date", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        console.log(body.review);
        expect(body.review).toBeSortedBy("created_at", {descending: true});
      });
  });

  test("GET - 404: Invalid Path", () => {
    return request(app)
      .get("/api/reviewswrongurl")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid URL");
      });
  });
});
