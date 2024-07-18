import { hc } from "hono/client";
import { render, useEffect, useState } from "hono/jsx/dom";
import type { ApiType } from "../api";
import { Account, Cart } from "../web/components";

const COMPONENT_MAP = {
  account: Account,
  cart: Cart,
};

async function getProducts() {
  const client = hc<ApiType>("/api");

  const result = await client.products.$get();
  const { products } = await result.json();
  return products;
}

function Products() {
  const [products, setProducts] = useState<
    Awaited<ReturnType<typeof getProducts>>
  >([]);

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

for (const [key, Component] of Object.entries(COMPONENT_MAP)) {
  // @ts-ignore
  const elements = [...document.querySelectorAll(`[data-mount="${key}"]`)];
  for (const element of elements) {
    render(<Component />, element);
  }
}
