import prisma from "./prisma.js";

export async function queryPrisma(
  queryObject: string | { text: string; values: any[] },
) {
  try {
    const result = await prisma.$queryRawUnsafe(
      typeof queryObject === "string" ? queryObject : queryObject.text,
      ...(typeof queryObject === "string" ? [] : queryObject.values),
    );

    return Array.isArray(result) && result.length === 1 ? result[0] : result;
  } catch (error) {
    console.error("Prisma error:", error);
    throw error;
  } finally {
    await prisma.$disconnect(); // Optional: Prisma handles this gracefully on process exit
  }
}
