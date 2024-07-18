import { useContext } from "hono/jsx";
import { AppContext } from "../../contexts";
import { HoverMenu } from "./HoverMenu";

export function Cart() {
  const { cart } = useContext(AppContext);
  const quantity = cart?.cartItems.length ?? 0;

  return (
    <HoverMenu trigger={<div>Cart: {quantity}</div>}>
      {cart && (quantity ?? 0) > 0 ? (
        <ul>
          {cart.cartItems.map((cartItem) => {
            return <li key={cartItem.id}>{cartItem.product.name}</li>;
          })}
        </ul>
      ) : null}
    </HoverMenu>
  );
}
