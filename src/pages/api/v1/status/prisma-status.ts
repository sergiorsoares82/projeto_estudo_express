import type { Request, Response } from "express";
import { queryPrisma } from "../../../../infra/database-prisma.js";

const prismaStatus = async (req: Request, res: Response) => {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = (await queryPrisma("SELECT version();")) as {
    version: string;
  };
  const databaseMaxConnectionsResult = (await queryPrisma(
    "SHOW max_connections;",
  )) as { max_connections: string };

  const databaseName = process.env.DATABASE_NAME;
  const databaseOpenedConnectionsResult = (await queryPrisma({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  })) as { count: string };

  res.status(200).json({
    updated_at: updatedAt,
    status: "ok",
    dependencies: {
      database: {
        version: databaseVersionResult.version,
        max_connections: parseInt(databaseMaxConnectionsResult.max_connections),
        opened_connections: parseInt(databaseOpenedConnectionsResult.count),
      },
    },
  });
};

export default prismaStatus;
