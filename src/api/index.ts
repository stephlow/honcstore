import { Hono } from "hono";
import { productsApi } from "./products";
import { usersApi } from "./users";
import { cartsApi } from "./carts";

export const api = new Hono();

api.route('/carts', cartsApi);
api.route('/products', productsApi);
api.route('/users', usersApi);
