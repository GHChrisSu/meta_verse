import { PrismaClient } from "@prisma/client";

export const PRISMA = new PrismaClient();

/**
 * Initiate connection to the database
 */
export async function connect() {
  await PRISMA.$connect();
}
