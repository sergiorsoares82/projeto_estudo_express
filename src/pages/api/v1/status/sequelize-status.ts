import querySequelize from "../../../../infra/database-sequelize.js";
import type { Request, Response } from "express";

export default async function sequelizeStatus(req: Request, res: Response) {
  const result = await querySequelize();
  console.log(result);
  res.status(200).json({
    status: "ok",
    data: result,
  });
}
