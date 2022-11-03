const supertest = require("supertest");
const app = require("../app");

const database = require("../database");
const request = supertest(app);

describe("Users Controllers Routes", () => {
  beforeAll(async () => {
    await database.connectDB();
  });

  afterAll(() => {
    database.disconnectDB();
  });

  it("Send signup data", async () => {
    const testUser = {
      email: "maxgood@gmail.com",
      password: "123Starsarebig!",
      name: "Max",
      lastname: "Good",
      age: 25,
      gender: "Male",
    };
    return await request
      .post("/api/users/signup")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            email: expect.any(String),
            password: expect.any(String),
            name: expect.any(String),
            lastname: expect.any(String),
            age: expect.any(Number),
            gender: expect.any(String),
          })
        );
      });
  });

  it("reply with an error if password is not strong", async () => {
    const testUser = {
      email: "maxgood@gmail.com",
      password: "123Starsarebig!",
      name: "Max",
      lastname: "Good",
      age: 25,
      gender: "Male",
    };
    return await request
      .post("/api/users/signup")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it("reply with an error if email is not valid format", async () => {
    const testUser = {
      email: "maxgoodgmail.com",
      password: "bao",
      name: "Max",
      lastname: "Good",
      age: 25,
      gender: "Male",
    };
    return await request
      .post("/api/users/signup")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it("reply with error using an existing email", async () => {
    const testUser = {
      email: "maxgood@gmail.com",
      password: "123starsarebig",
      name: "Max",
      lastname: "Good",
      age: 25,
      gender: "Male",
    };
    return await request
      .post("/api/users/signup")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it("reply with error if a required field is missing", async () => {
    const testUser = {
      email: "test@gmail.com",
      password: "123forfive",
      name: "",
      lastname: "Goodman",
    };
    return await request
      .post("/api/users/signup")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it("login succesfully", async () => {
    const testUser = {
      email: "maxgood@gmail.com",
      password: "123Starsarebig!",
    };
    return await request
      .post("/api/users/login")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            email: expect.any(String),
            token: expect.any(String),
          })
        );
      });
  });

  it("reply with error about bad password", async () => {
    const testUser = {
      email: "maxgood@gmail.com",
      password: "123ig!",
    };
    return await request
      .post("/api/users/login")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: "Incorrect password",
          })
        );
      });
  });

  it("reply with error about bad email", async () => {
    const testUser = {
      email: "maxgoodgmail.com",
      password: "123Starsarebig!",
    };
    return await request
      .post("/api/users/login")
      .send(testUser)
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            error: "Incorrect or unregistered email",
          })
        );
      });
  });
});
