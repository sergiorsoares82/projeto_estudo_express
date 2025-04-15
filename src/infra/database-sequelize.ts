import { Sequelize } from "sequelize-typescript";

const querySequelize = async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.SEQUELIZE_HOST,
    database: process.env.SEQUELIZE_DATABASE,
    username: process.env.SEQUELIZE_USERNAME,
    password: process.env.SEQUELIZE_PASSWORD,
    port: process.env.SEQUELIZE_PORT
      ? parseInt(process.env.SEQUELIZE_PORT)
      : 5432,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // use true se tiver um certificado válido
      },
    },
  });

  const result = await sequelize.query("SELECT NOW()");
  await sequelize.close();
  return result;
};

export default querySequelize;
