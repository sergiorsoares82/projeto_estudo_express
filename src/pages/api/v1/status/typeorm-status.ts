import type { Request, Response } from "express";
import { queryTypeOrm } from "../../../../infra/database-typeorm.js";

export default async function typeORMStatus(req: Request, res: Response) {
  const result = await queryTypeOrm();
  console.log(result);
  res.status(200).json({
    status: "ok",
    data: result,
  });
}
