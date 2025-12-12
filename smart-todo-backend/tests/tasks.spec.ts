import request from "supertest";
import app from "../src/app";

describe("Tasks API", () => {
  it("GET /api/tasks should return tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("success", true);
    expect(Array.isArray(res.body.tasks)).toBe(true);
  });
});
