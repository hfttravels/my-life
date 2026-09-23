import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as dotenv from "dotenv";

if (!process.env.DATABASE_URL) {
  dotenv.config({ path: ".env.local" });
}

function createDb() {
  const connectionString =
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/postgres";
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
}

// Global cache for DB client during dev hot reloading
const globalForDb = globalThis as unknown as {
  dbInstance: ReturnType<typeof createDb> | undefined;
};

export const db = globalForDb.dbInstance ?? createDb();

if (process.env.NODE_ENV !== "production") {
  globalForDb.dbInstance = db;
}

export * from "./schema";
