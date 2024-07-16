import { Hono } from "hono";
import { NewCart, NewCartItem, cartItems, carts, getDatabase } from "../db";
import { eq, sql } from "drizzle-orm";

export const cartsApi = new Hono();

cartsApi.get('/', async (context) => {
  const db = getDatabase(context);

  return context.json({
    carts: await db.select().from(carts),
  });
});

cartsApi.post('/', async (context) => {
  const db = getDatabase(context);

  const payload = await context.req.json<NewCart>();

  const [cart] = await db.insert(carts).values(payload).returning();

  return context.json({
    cart
  })
});

cartsApi.get('/:id', async (context) => {
  const id = context.req.param('id');

  const db = getDatabase(context);

  const [cart] = await db.select().from(carts).where(sql`${carts.id} = ${id}`).innerJoin(cartItems, eq(carts.id, cartItems.cartId));

  return context.json({
    cart
  });
});

cartsApi.put('/:id', async (context) => {
  const cartId = Number.parseInt(context.req.param('id') ?? '');

  const db = getDatabase(context);

  const payload = await context.req.json<Omit<NewCartItem, 'cartId'>>();

  const [cartItem] = await db.insert(cartItems).values({
    cartId,
    ...payload,
  }).returning();

  return context.json({
    cartItem,
  });
});
