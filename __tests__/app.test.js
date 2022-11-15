const request = require("supertest");
const app = require("../app.js");
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data/index');

beforeEach(() => {
  return seed(testData);
});

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

  test('GET - 404 - Invalid Path', () => {
    return request(app)
      .get("/api/categoriesbadurl")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe('Invalid URL');
      });
  });

});
