import waitForServer from "src/tests/waitforserver";
describe("Sequelize Status API", () => {
  beforeAll(async () => {
    await waitForServer("http://localhost:3001/api/v1/status");
  });
  describe("GET /api/v1/status/sequelize", () => {
    it("should return 200 OK", async () => {
      const response = await fetch(
        "http://localhost:3001/api/v1/status/prisma",
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(responseBody.dependencies.database.version).toEqual(
        "PostgreSQL 16.0 on x86_64-pc-linux-musl, compiled by gcc (Alpine 12.2.1_git20220924-r10) 12.2.1 20220924, 64-bit",
      );
      expect(responseBody.dependencies.database.max_connections).toEqual(100);
      expect(responseBody.dependencies.database.opened_connections).toEqual(0);
    });
  });
});
