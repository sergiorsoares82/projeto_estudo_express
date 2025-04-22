import type { Request, Response } from "express";
import query from "../../../../infra/database-pg.js";

export default async function status(req: Request, res: Response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult?.rows[0].server_version;

  const databaseMaxConnectionsResult = await query("SHOW max_connections;");
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult?.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DATABASE;
  const databaseOpenedConnectionsResult = await query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult?.rows[0].count;

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}
