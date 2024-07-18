import { ProductImage } from "../../components";
import type { SelectProduct } from "../../db";

type ProductDetailProps = {
  product: SelectProduct;
};

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <article className="flex gap-8">
      <div className="min-w-72">
        <ProductImage />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-medium">{product.name}</h1>
        <p className="text-lg">{product.description}</p>
        <div data-mount="addToCart" data-props={JSON.stringify({ product })} />
      </div>
    </article>
  );
}
