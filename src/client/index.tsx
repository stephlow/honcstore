import { hc } from "hono/client";
import { render, useEffect, useState } from "hono/jsx/dom";
import type { ApiType } from "../api";

async function getProducts() {
  const client = hc<ApiType>('/api');

  const result = await client.products.$get();
  const { products } = await result.json();
  return products;
}

function Products() {
  const [products, setProducts] = useState<Awaited<ReturnType<typeof getProducts>>>([]);

  async function load() {
    setProducts(await getProducts());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            {product.name}
            {product.description}
          </li>
        );
      })}
    </ul>
  );
}

// @ts-ignore
const root = document.getElementById('root');
render(<Products />, root);
