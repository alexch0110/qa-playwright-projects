import { PrismaClient } from "@prisma/client";
import { env } from "../src/config/env";

export const prisma = new PrismaClient({ accelerateUrl: env.DATABASE_URL });
