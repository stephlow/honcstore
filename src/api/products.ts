import { Hono } from "hono";
import { InsertProduct, getDatabase, insertProductSchema, products } from "../db";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

export const productsApi = new Hono()
  .get("/", async (context) => {
    const db = getDatabase(context);

    const products = await db.query.products.findMany()

    return context.json({
      products,
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
    const id = Number.parseInt(context.req.param('id'));

    const db = getDatabase(context);

    const product = await db.query.products.findFirst({
      where: eq(products.id, id),
    })

    if (product) {
      return context.json({
        product,
      });
    }

    return context.json(null, 404);
  });
