import "./config/env.js";
import express from "express";
import "reflect-metadata";
import router from "./routes/index.js";

const app = express();

const PORT = 3001;

app.use(router);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
