import { Sequelize } from "sequelize-typescript";
import { QueryTypes } from "sequelize";

interface QueryObject {
  text: string;
  values: any[];
}

const querySequelize = async (queryObject: string | QueryObject) => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.SEQUELIZE_HOST,
    database: process.env.SEQUELIZE_DATABASE,
    username: process.env.SEQUELIZE_USER,
    password: process.env.SEQUELIZE_PASSWORD,
    port: process.env.SEQUELIZE_PORT
      ? parseInt(process.env.SEQUELIZE_PORT)
      : 5432,
    dialectOptions:
      process.env.NODE_ENV === "development"
        ? {}
        : {
            // ssl: true,
            ssl: {
              require: process.env.NODE_ENV === "development" ? false : true,
              rejectUnauthorized: false, // dependendo do provedor do banco
            },
          },
  });

  try {
    const [result] = await sequelize.query(
      typeof queryObject === "string" ? queryObject : queryObject.text,
      {
        bind: typeof queryObject === "string" ? [] : queryObject.values,
        type: QueryTypes.SELECT,
      },
    );

    return result;
  } catch (error) {
    console.error("Sequelize error:", error);
    throw error;
  } finally {
    await sequelize.close();
  }
};

export default querySequelize;
