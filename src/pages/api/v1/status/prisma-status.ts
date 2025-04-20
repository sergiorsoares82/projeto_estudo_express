import type { Request, Response } from "express";
import queryPrisma from "../../../../infra/database-prisma.js";

const prismaStatus = async (req: Request, res: Response) => {
  const result = await queryPrisma();
  res.status(200).json({
    status: "ok",
    data: result,
  });
};

export default prismaStatus;
