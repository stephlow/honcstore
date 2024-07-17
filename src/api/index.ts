import { Hono } from "hono";
import { productsApi } from "./products";
import { usersApi } from "./users";
import { cartsApi } from "./carts";
import { authApi } from "./auth";

export const api = new Hono()
  .route('/auth', authApi)
  .route('/carts', cartsApi)
  .route('/products', productsApi)
  .route('/users', usersApi);


export type ApiType = typeof api;

