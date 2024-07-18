import { useContext } from "hono/jsx";
import { AppContext } from "../contexts";
import { Bubble, HoverMenu } from "./UI";

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
        <ul>
          {cart.cartItems.map((cartItem) => {
            return <li key={cartItem.id}>{cartItem.product.name}</li>;
          })}
        </ul>
      ) : (
        "Your cart is empty!"
      )}
    </HoverMenu>
  );
}
