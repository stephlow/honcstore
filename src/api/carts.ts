import { Hono } from "hono";
import { InsertCart, InsertCartItem, cartItems, carts, getDatabase, insertCartItemSchema, insertCartSchema } from "../db";
import { eq, sql } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

export const cartsApi = new Hono()
  .get('/', async (context) => {
    const db = getDatabase(context);

    return context.json({
      carts: await db.select().from(carts),
    });
  })
  .post('/', zValidator('json', insertCartSchema), async (context) => {
    const db = getDatabase(context);

    const payload = await context.req.json<InsertCart>();

    const [cart] = await db.insert(carts).values(payload).returning();

    return context.json({
      cart
    })
  })
  .get('/:id', async (context) => {
    const id = context.req.param('id');

    const db = getDatabase(context);

    const [cart] = await db.select().from(carts).where(sql`${carts.id} = ${id}`).innerJoin(cartItems, eq(carts.id, cartItems.cartId));

    return context.json({
      cart
    });
  })
  .put('/:id', zValidator('json', insertCartItemSchema), async (context) => {
    const cartId = Number.parseInt(context.req.param('id') ?? '');

    const db = getDatabase(context);

    const payload = await context.req.json<Omit<InsertCartItem, 'cartId'>>();

    const [cartItem] = await db.insert(cartItems).values({
      cartId,
      ...payload,
    }).returning();

    return context.json({
      cartItem,
    });
  });
