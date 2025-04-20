import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: 5436,
  username: process.env.TYPEORM_USER,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [],
});

export const queryTypeOrm = async () => {
  console.log("PORT: ", process.env.TYPEORM_PORT);
  console.log("PASSWORD: ", process.env.TYPEORM_PASSWORD);
  await AppDataSource.initialize();
  const result = await AppDataSource.query("SELECT NOW()");
  console.log(result);
  await AppDataSource.destroy();
  return result;
};
