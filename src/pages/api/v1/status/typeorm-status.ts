import type { Request, Response } from "express";
import { queryTypeOrm } from "../../../../infra/database-typeorm.js";

export default async function typeORMStatus(req: Request, res: Response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = (await queryTypeOrm("SELECT version();")) as {
    version: string;
  }[];

  const databaseMaxConnectionsResult = (await queryTypeOrm(
    "SHOW max_connections;",
  )) as { max_connections: string }[];

  const databaseName = process.env.TYPEORM_DATABASE;

  const databaseOpenedConnectionsResult = (await queryTypeOrm({
    text: "SELECT count(*)::int AS count FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  })) as { count: number }[];

  const databaseVersion = databaseVersionResult[0]?.version;
  const databaseMaxConnections = parseInt(
    databaseMaxConnectionsResult[0]?.max_connections,
  );
  const databaseOpenedConnections = databaseOpenedConnectionsResult[0]?.count;

  res.status(200).json({
    updated_at: updatedAt,
    status: "ok",
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: databaseMaxConnections,
        opened_connections: databaseOpenedConnections,
      },
    },
  });
}
