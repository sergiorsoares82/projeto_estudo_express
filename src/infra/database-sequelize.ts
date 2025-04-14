import { Sequelize } from "sequelize-typescript";

const querySequelize = async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    username: "postgres",
    password: "local_password",
    port: 5430,
  });

  const result = await sequelize.query("SELECT NOW()");
  await sequelize.close();
  return result;
};

export default querySequelize;
