import { ProductImage } from "../../components";
import type { SelectProduct } from "../../db";

export function ProductOverview({
  products,
}: { products: Array<SelectProduct> }) {
  return (
    <ul className="grid grid-cols-2 gap-8 -mx-4 md:grid-cols-4">
      {products.map((product) => {
        return (
          <li key={product.id} className="flex flex-col gap-4">
            <a
              href={`/products/${product.slug}`}
              className="flex flex-col gap-4 p-4 rounded hover:bg-slate-200"
            >
              <ProductImage />
              <span className="text-lg font-medium">
                {product.name}
              </span>
            </a>
            <div
              className="px-4"
              data-mount="addToCart"
              data-props={JSON.stringify({ product })}
            />
          </li>
        );
      })}
    </ul>
  );
}
