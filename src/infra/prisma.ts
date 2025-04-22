import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient({
  log: ["error"],
  errorFormat: "pretty",
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export default prisma;
