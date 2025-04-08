import express, { type Request, type Response } from "express";

const app = express();

const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// if (process.env.NODE_ENV === "development") {
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// }
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

export default app;
