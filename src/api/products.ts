import { Hono } from "hono";
import { InsertProduct, getDatabase, insertProductSchema, products } from "../db";
import { sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

export const productsApi = new Hono()
  .get("/", async (context) => {
    const db = getDatabase(context);

    return context.json({
      products: await db.select().from(products)
    });
  })
  .post("/", zValidator('json', insertProductSchema), async (context) => {
    const db = getDatabase(context);

    const payload = await context.req.json<InsertProduct>()

    const [product] = await db.insert(products).values(payload).returning();

    return context.json({
      product,
    })
  })
  .get("/:id", async (context) => {
    const id = context.req.param('id');

    const db = getDatabase(context);

    const [product] = await db.select().from(products).where(sql`${products.id} = ${id}`);

    return context.json({
      product,
    });
  });
