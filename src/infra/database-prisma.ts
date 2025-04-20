import prisma from "./prisma.js";

const queryPrisma = async () => {
  const result = await prisma.$queryRawUnsafe(`SELECT NOW()`);
  console.log(result);
  await prisma.$disconnect();
  return result;
};

queryPrisma();

export default queryPrisma;
