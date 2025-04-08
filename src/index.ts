import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { existsSync } from "node:fs";

const app = express();

const PORT = 3001;
const envFile = `.env.${process.env.NODE_ENV}`;
if (existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config(); // fallback para .env
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
