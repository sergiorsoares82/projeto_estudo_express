import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { existsSync } from "node:fs";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;
const envFile = `.env.${process.env.NODE_ENV}`;
// if (existsSync(envFile)) {
//   dotenv.config({ path: envFile });
// } else {
//   dotenv.config(); // fallback para .env
// }

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
