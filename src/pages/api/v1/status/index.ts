import type { Request, Response } from "express";
import query from "../../../../infra/database-pg.js";

export default async function status(req: Request, res: Response) {
  const result = await query();
  res.status(200).json({
    status: "ok",
    data: result,
  });
}
