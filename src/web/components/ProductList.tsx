import type { SelectProduct } from "../../db";

export function ProductList({ products }: { products: Array<SelectProduct> }) {
  return (
    <ul>
      {products.map((product) => {
        return (
          <li key={product.id}>
            <a href={`/products/${product.slug}`}>
              {product.name}
            </a>
          </li>
        )
      })}
    </ul>
  );
}
