/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { useState } from "hono/jsx";
import { createPortal, render, useMemo } from "hono/jsx/dom";
import { AppContext, type AppState } from "../contexts";
// import { Account } from "../web";
import { Account, AddToCartButton, Cart } from "../web";

const COMPONENT_MAP = {
  account: Account,
  addToCart: AddToCartButton,
  cart: Cart,
};

function Root() {
  const [auth, setAuth] = useState<AppState["auth"]>(null);
  const [cart, setCart] = useState<AppState["cart"]>();

  const portals = useMemo(() => {
    return Object.entries(COMPONENT_MAP).flatMap(([key, Component]) => {
      const elements = [
        ...document.querySelectorAll(`[data-mount="${key}"]`),
      ] as Array<HTMLElement>;
      return elements.map((element) =>
        createPortal(
          <Component {...JSON.parse(element.dataset.props ?? "{}")} />,
          element,
        ),
      );
    });
  }, []);

  return (
    <AppContext.Provider value={{ auth, setAuth, cart, setCart }}>
      {portals}
    </AppContext.Provider>
  );
}

const root = document.getElementById("root");
if (root) {
  render(<Root />, root);
}
