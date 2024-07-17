import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

config({ path: ".dev.vars" });

const databaseUrl = drizzle(
  postgres(`${process.env.DATABASE_URL}`, { ssl: "require", max: 1 }),
);

const main = async () => {
  try {
    await migrate(databaseUrl, { migrationsFolder: "drizzle" });
    // biome-ignore lint/suspicious/noConsoleLog: Exception for scripts
    console.log("Migration complete");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
