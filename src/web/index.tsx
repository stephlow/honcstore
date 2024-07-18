import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { getDatabase, products } from '../db'
import { Layout, ProductList } from './components'

export const web = new Hono()



web.get('/', async (context) => {
  const db = getDatabase(context);

  const products = await db.query.products.findMany();

  return context.html(
    <Layout>
      <ProductList products={products} />
    </Layout>
  )
})

web.get('/products/:slug', async (context) => {
  const slug = context.req.param('slug');

  const db = getDatabase(context);
  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
  });

  if (!product) {
    return context.redirect('/404');
  }

  return context.html(
    <Layout>
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </Layout>
  );
});
