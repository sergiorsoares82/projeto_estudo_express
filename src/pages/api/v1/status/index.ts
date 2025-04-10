import type { Request, Response } from "express";

export default function status(req: Request, res: Response) {
  res.status(200).json({
    status: "ok",
  });
}
