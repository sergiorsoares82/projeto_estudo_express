describe("Status API", () => {
  it("should return a 200 status code", async () => {
    const baseUrl = "http://localhost:3001/api/v1/status";
    const response = await fetch(baseUrl);

    expect(response.status).toBe(200);
  });
});
