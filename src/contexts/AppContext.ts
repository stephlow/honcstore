import { createContext } from "hono/jsx";
import type { authenticate, createCart } from "../rpc";

type Auth = Awaited<ReturnType<typeof authenticate>>;
type Cart = Awaited<ReturnType<typeof createCart>>["cart"];

export type AppState = {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  cart: Cart;
  setCart: (cart: Cart) => void;
};

export const AppContext = createContext<AppState>({
  auth: null,
  setAuth: noop,
  cart: undefined,
  setCart: noop,
});

// biome-ignore lint/suspicious/noEmptyBlockStatements: noop
function noop() {}
