import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
// To run the server, use the command: node src/index.js
// To test the server, open your browser and go to: http://localhost:3000
export default app;
