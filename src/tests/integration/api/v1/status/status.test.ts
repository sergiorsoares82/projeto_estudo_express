import waitForServer from "src/tests/waitforserver";

describe("Status API", () => {
  beforeAll(async () => {
    await waitForServer("http://localhost:3001/api/v1/status");
  });
  describe("GET /api/v1/status", () => {
    it("should return 200 OK", async () => {
      const response = await fetch("http://localhost:3001/api/v1/status");

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(responseBody.dependencies.database.version).toEqual("16.0");
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.opened_connections).toEqual(0);
    });
  });
});
