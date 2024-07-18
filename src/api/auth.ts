import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { getDatabase, users } from "../db";
import { eq } from "drizzle-orm";
import { compareSync } from "bcrypt-edge";
import { sign } from "hono/jwt";
import type { Context } from "hono";

const authUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthUser = z.infer<typeof authUserSchema>;

export const authApi = new Hono()
  .post("/", zValidator("json", authUserSchema), async (context: Context) => {
    const payload = await context.req.json<AuthUser>();

    const db = getDatabase(context);
    const result = await db.query.users.findFirst({
      where: eq(users.email, payload.email),
    });

    console.log('found', result);

    if (result) {
      const { passwordHash, ...user } = result;
      const passwordMatches = compareSync(payload.password, passwordHash);
      console.log('passwordMatches', passwordMatches);

      if (passwordMatches) {
        const token = await sign({ sub: user.id }, context.env.JWT_SECRET);

        return context.json({
          token,
          user,
        });
      }
    }

    return context.json(null, 401);
  });
