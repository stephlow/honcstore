import { Context, Hono } from "hono";
import { getDatabase, users, insertUserSchema } from "../db";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { genSaltSync, hashSync } from "bcrypt-edge";
import { sign } from "hono/jwt";

const newUserSchema = insertUserSchema.omit({ id: true, passwordHash: true }).extend({ password: z.string() });

type NewUser = z.infer<typeof newUserSchema>;

export const usersApi = new Hono()
  .get('/', async (context) => {
    const db = getDatabase(context);

    const users = await db.query.users.findMany();

    return context.json({
      users,
    });
  })
  .post("/", zValidator('json', newUserSchema), async (context: Context) => {
    const db = getDatabase(context);

    const { password, ...payload } = await context.req.json<NewUser>();

    const salt = genSaltSync(context.env.SALT_ROUNDS);

    const insertUser = {
      ...payload,
      passwordHash: hashSync(password, salt)
    };

    const [user] = await db.insert(users).values(insertUser).returning();
    const token = await sign({ sub: user.id }, context.env.JWT_SECRET);


    return context.json({
      token,
      user,
    });
  });
