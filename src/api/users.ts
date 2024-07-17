import { Context, Hono } from "hono";
import { getDatabase, users, insertUserSchema } from "../db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { hashSync } from "bcrypt-edge";

const newUserSchema = insertUserSchema.omit({ id: true, passwordHash: true }).extend({ password: z.string() });

type NewUser = z.infer<typeof newUserSchema>;

export const usersApi = new Hono()
  .get('/', async (context) => {
    const db = getDatabase(context);

    return context.json({
      users: await db.select().from(users),
    });
  })
  .post("/", zValidator('json', newUserSchema), async (context: Context) => {
    const db = getDatabase(context);

    const { password, ...payload } = await context.req.json<NewUser>();

    const insertUser = {
      ...payload,
      passwordHash: hashSync(password, context.env.SALT_ROUNDS)
    };

    const [user] = await db.insert(users).values(insertUser).returning();

    return context.json({
      user,
    });
  });
