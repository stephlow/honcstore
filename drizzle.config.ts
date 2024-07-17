import type { Config } from "drizzle-kit";

// biome-ignore lint/style/noDefaultExport: Drizzle convention
export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
} satisfies Config;
