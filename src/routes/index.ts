import express from "express";
import status from "../pages/api/v1/status/index.js";
import query from "../infra/database-pg.js";
import sequelizeStatus from "../pages/api/v1/status/sequelize-status.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await query();
  console.log(result.rows);
  res.send("API is running");
});

router.get("/api/v1/status", status);
router.get("/api/v1/status/sequelize", sequelizeStatus);

export default router;
