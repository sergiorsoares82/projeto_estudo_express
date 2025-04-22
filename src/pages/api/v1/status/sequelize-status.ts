import querySequelize from "../../../../infra/database-sequelize.js";
import type { Request, Response } from "express";

export default async function sequelizeStatus(req: Request, res: Response) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = (await querySequelize("SELECT version();")) as {
    version: string;
  };
  const databaseMaxConnectionsResult = (await querySequelize(
    "SHOW max_connections;",
  )) as { max_connections: string };
  const databaseName = process.env.SEQUELIZE_DATABASE;
  const databaseOpenedConnectionsResult = (await querySequelize({
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
}
