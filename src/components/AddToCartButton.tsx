import { useCallback, useContext } from "hono/jsx";
import { AppContext } from "../contexts";
import type { SelectProduct } from "../db";
import { addToCart, createCart, getCartById } from "../rpc";
import { Button } from "./UI";

type AddToCartButtonProps = {
  product: SelectProduct;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { auth, cart, setCart } = useContext(AppContext);

  // @ts-ignore
  const addToCartHandler = useCallback(
    (product: SelectProduct) => {
      (async () => {
        const handle = cart ?? (await createCart(auth?.user.id)).cart;

        if (handle) {
          await addToCart(handle.id, product.id);

          setCart((await getCartById(handle.id)).cart);
        }
      })();
    },
    [cart],
  );

  return (
    <Button onClick={() => addToCartHandler(product)}>
      Add {product.name} to cart
    </Button>
  );
}
