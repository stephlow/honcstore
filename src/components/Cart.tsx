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
        <ul className="flex flex-col gap-4 ">
          {cart.cartItems.map((cartItem) => {
            return (
              <li key={cartItem.id}>
                <a href={`/product/${cartItem.product.slug}`} className="flex gap-4 p-4 rounded hover:bg-slate-200">
                  <div className="w-20">
                    <ProductImage />
                  </div>
                  <div className="flex flex-col w-32">
                    <h1 className="text-md font-medium">{cartItem.product.name}</h1>
                    {cartItem.product.description && (
                      <p className="text-xs">{cartItem.product.description}</p>
                    )}
                  </div>
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
