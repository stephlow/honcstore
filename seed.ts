import { neon } from "@neondatabase/serverless";
import { genSaltSync, hashSync } from "bcrypt-edge";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
// biome-ignore lint/nursery/useImportRestrictions: Exception for scripts
import { type InsertUser, users } from "./src/db";

config({ path: ".dev.vars" });

// biome-ignore lint/style/noNonNullAssertion: error from neon client is helpful enough to fix
const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
const SALT_ROUNDS = process.env.SALT_ROUNDS;

if (!SALT_ROUNDS) {
  throw Error("Missing env var SALT_ROUNDS");
}

async function seed() {
  // biome-ignore lint/style/noNonNullAssertion: Throws if missing
  const salt = genSaltSync(Number.parseInt(SALT_ROUNDS!));

  const newUsers: Array<InsertUser> = [
    {
      name: "Laszlo Cravensworth",
      email: "laszlo@cravensworth.com",
      passwordHash: hashSync("1234", salt),
    },
    {
      name: "Nadja Antipaxos",
      email: "nadja@antipaxos.com",
      passwordHash: hashSync("1234", salt),
    },
    {
      name: "Colin Robinson",
      email: "colin@robinson.com",
      passwordHash: hashSync("1234", salt),
    },
  ];

  await db.insert(users).values(newUsers);
}

async function main() {
  try {
    await seed();
    // biome-ignore lint/suspicious/noConsoleLog: Exception for scripts
    console.log("Seeding completed");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}
main();
