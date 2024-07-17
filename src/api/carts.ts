import { Hono } from "hono";
import { InsertCart, InsertCartItem, cartItems, carts, getDatabase, insertCartItemSchema, insertCartSchema } from "../db";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";

export const cartsApi = new Hono()
  .get('/', async (context) => {
    const db = getDatabase(context);

    const carts = await db.query.carts.findMany({
      with: {
        cartItems: {
          with: {
            product: true,
          }
        },
      },
    })

    return context.json({
      carts,
    });
  })
  .post('/', zValidator('json', insertCartSchema), async (context) => {
    const db = getDatabase(context);

    const payload = await context.req.json<InsertCart>();

    const [{ id }] = await db.insert(carts).values(payload).returning({ id: carts.id });

    const cart = await db.query.carts.findFirst({
      with: {
        cartItems: {
          with: {
            product: true,
          }
        },
      },
      where: eq(carts.id, id),
    })

    return context.json({
      cart
    })
  })
  .get('/:id', async (context) => {
    const id = Number.parseInt(context.req.param('id'));

    const db = getDatabase(context);

    const cart = await db.query.carts.findFirst({
      with: {
        cartItems: {
          with: {
            product: true,
          }
        },
      },
      where: eq(carts.id, id),
    });

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
