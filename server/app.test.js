const supertest = require("supertest");
const app = require("./app");

const database = require("./database");
const request = supertest(app);

describe("Main Route", () => {
  beforeAll(async () => {
    await database.connectDB();
  });

  afterAll(() => {
    database.disconnectDB();
  });

  it("Get a 404 error if not found", async () => {
    return await request
      .get("/dfjsdlkfjsl")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});
