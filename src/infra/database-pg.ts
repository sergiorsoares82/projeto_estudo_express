import pg from "pg";
const query = async (queryObject: string) => {
  const client = new pg.Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT)
      : undefined,
    // ssl: {
    //   rejectUnauthorized: false,
    // },
  });
  client.on("error", (err) => {
    console.error("PostgreSQL error:", err);
  });

  await client.connect();
  try {
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
};

export default query;
