import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

type InferNewType<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email").unique().notNull(),
  settings: jsonb("settings"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;

export type NewUser = InferNewType<typeof users.$inferInsert>;

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text('slug').unique().notNull(),
  description: text('description'),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;

export type NewProduct = InferNewType<typeof products.$inferInsert>;

export const carts = pgTable("carts", {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

export type Cart = typeof carts.$inferSelect;

export type NewCart = InferNewType<typeof carts.$inferInsert>;

export const cartItems = pgTable("cart_items", {
  id: serial('id').primaryKey(),
  cartId: integer('cart_id').references(() => carts.id).notNull(),
  productId: integer('product_id').references(() => products.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type CartItem = typeof cartItems.$inferSelect;

export type NewCartItem = InferNewType<typeof cartItems.$inferInsert>
