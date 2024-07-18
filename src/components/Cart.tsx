import { useContext } from "hono/jsx";
import { AppContext } from "../contexts";
import { Bubble, HoverMenu } from "./UI";
import { ProductImage } from "./ProductImage";

export function Cart() {
  const { cart } = useContext(AppContext);
  const quantity = cart?.cartItems.length ?? 0;

  return (
    <HoverMenu
      trigger={
        <div className="flex gap-2">
          Cart {quantity > 0 && <Bubble>{quantity}</Bubble>}
        </div>
      }
    >
      {cart && (quantity ?? 0) > 0 ? (
        <ul className="flex flex-col gap-4">
          {cart.cartItems.map((cartItem) => {
            return (
              <li key={cartItem.id}>
                <a href={`/product/${cartItem.product.slug}`} className="flex gap-4 p-4 rounded hover:bg-slate-200 
">
                  <div className="w-20">
                    <ProductImage />
                  </div>
                  {cartItem.product.name}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        "Your cart is empty!"
      )}
    </HoverMenu>
  );
}
