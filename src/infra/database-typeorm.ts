import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT || "5432"),
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  entities: [], // adicione suas entidades aqui, se for usar ORM
  ssl: process.env.NODE_ENV === "development" ? false : true,
});

export async function queryTypeOrm(
  query: string | { text: string; values: any[] },
): Promise<any> {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    if (typeof query === "string") {
      return await AppDataSource.query(query);
    } else {
      return await AppDataSource.query(query.text, query.values);
    }
  } catch (error) {
    console.error("TypeORM Query Error:", error);
    throw error;
  } finally {
    // Opcional: desconectar após cada chamada (ou gerencie globalmente)
    await AppDataSource.destroy();
  }
}
