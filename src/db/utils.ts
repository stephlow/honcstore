import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { Context } from "hono";

export function getDatabase(context: Context) {
  const connection = neon(context.env.DATABASE_URL);
  return drizzle(connection);
}
