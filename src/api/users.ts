import { Hono } from "hono";
import { getDatabase, users, insertUserSchema, InsertUser } from "../db";
import { zValidator } from "@hono/zod-validator";

export const usersApi = new Hono()
  .get('/', async (context) => {
    const db = getDatabase(context);

    return context.json({
      users: await db.select().from(users),
    });
  })
  .post("/", zValidator('json', insertUserSchema), async (context) => {
    const db = getDatabase(context);

    const payload = await context.req.json<InsertUser>();

    const [user] = await db.insert(users).values(payload).returning();

    return context.json({
      user,
    });
  });
