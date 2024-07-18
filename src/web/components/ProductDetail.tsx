import type { SelectProduct } from "../../db";
import { Button } from "./Button";
import { ProductImage } from "./ProductImage";

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
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <Button>Add to cart</Button>
      </div>
    </article>
  );
}
