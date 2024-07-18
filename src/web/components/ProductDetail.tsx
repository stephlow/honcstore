import { ProductImage } from "../../components";
import type { SelectProduct } from "../../db";

type ProductDetailProps = {
  product: SelectProduct;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <article className="flex flex-col gap-8 md:flex-row">
      <div className="min-w-72 md:min-w-96">
        <ProductImage />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-medium">{product.name}</h1>
        {product.description && (
          <p className="text-lg">{product.description}</p>
        )}
        <div data-mount="addToCart" data-props={JSON.stringify({ product })} />
      </div>
    </article>
  );
}
