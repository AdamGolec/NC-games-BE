const request = require("supertest");
const app = require("../app.js");

describe("/api/categories", () => {
  test('GET - 200: responds with "message": "all ok"', () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          message: "all ok",
        });
      });
  });

  test("GET - 200: responds with an array of category objects, each of which should have properties: slug, description", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.category).toEqual(
          expect.arrayContaining([
            {
              slug: expect.any(String),
              description: expect.any(String),
            },
          ])
        );
      });
  });

  test('GET - 404 - Invalid Path', () => {
    return request(app)
      .get("/api/categoriesbadurl")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe('Invalid URL');
      });
  });

});
