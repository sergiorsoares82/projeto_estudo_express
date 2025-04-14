import pg from "pg";
const query = async () => {
  const client = new pg.Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT
      ? parseInt(process.env.POSTGRES_PORT)
      : undefined,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  client.on("error", (err) => {
    console.error("PostgreSQL error:", err);
  });

  await client.connect();
  const res = await client.query("SELECT NOW()");
  console.log(res.rows[0]);
  await client.end();
  return res;
};

export default query;
