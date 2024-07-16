import { Hono } from "hono";
import { NewProduct, getDatabase, products } from "../db";
import { sql } from "drizzle-orm";

export const productsApi = new Hono();

productsApi.get("/", async (context) => {
  const db = getDatabase(context);

  return context.json({
    products: await db.select().from(products)
  });
});

productsApi.post("/", async (context) => {
  const db = getDatabase(context);

  const payload = await context.req.json<NewProduct>()

  const [product] = await db.insert(products).values(payload).returning();

  return context.json({
    product,
  })
});

productsApi.get("/:id", async (context) => {
  const id = context.req.param('id');

  const db = getDatabase(context);

  const [product] = await db.select().from(products).where(sql`${products.id} = ${id}`);

  return context.json({
    product,
  });
});
