import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { getDatabase, products } from "../db";
import { Layout, ProductDetail, ProductOverview } from "./components";

export * from "./components";

export const web = new Hono();

web.get("/", async (context) => {
  const db = getDatabase(context);

  const products = await db.query.products.findMany();

  return context.html(
    <Layout>
      <ProductOverview products={products} />
    </Layout>,
  );
});

web.get("/products/:slug", async (context) => {
  const slug = context.req.param("slug");

  const db = getDatabase(context);
  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
  });

  if (!product) {
    return context.redirect("/404");
  }

  return context.html(
    <Layout title={product.name}>
      <ProductDetail product={product} />
    </Layout>,
  );
});
