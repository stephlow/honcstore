import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import type { Context } from "hono";
// biome-ignore lint/style/noNamespaceImport: Drizzle convention
import * as schema from "./schema";

export function getDatabase(context: Context) {
  const connection = neon(context.env.DATABASE_URL);
  return drizzle(connection, { schema });
}
