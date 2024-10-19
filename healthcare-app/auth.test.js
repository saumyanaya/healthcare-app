// backend/__tests__/auth.test.js
const request = require("supertest");
const app = require("../server"); // Assume server.js exports the app

describe("POST /api/auth/register", () => {
  it("should register a user", async () => {
    const response = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "password123",
      role: "patient",
    });
    expect(response.status).toBe(201);
  });
});
