import type { SelectProduct } from "../../db";
import { ProductImage } from "./ProductImage";

export function ProductList({ products }: { products: Array<SelectProduct> }) {
  return (
    <ul className="grid grid-cols-2 gap-8">
      {products.map((product) => {
        return (
          <li key={product.id}>
            <a
              href={`/products/${product.slug}`}
              className="flex flex-col gap-4"
            >
              <ProductImage />
              {product.name}
            </a>
            <div data-mount="addToCart" data-props={JSON.stringify({ product })} />
          </li>
        );
      })}
    </ul>
  );
}
