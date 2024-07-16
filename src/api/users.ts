import { Hono } from "hono";
import { getDatabase, users, NewUser } from "../db";

export const usersApi = new Hono();

usersApi.get('/', async (context) => {
  const db = getDatabase(context);

  return context.json({
    users: await db.select().from(users),
  });
});

usersApi.post("/", async (c) => {
  const db = getDatabase(c);

  const payload = await c.req.json<NewUser>();

  const [user] = await db.insert(users).values(payload).returning();

  return c.json({
    user,
  });
});
