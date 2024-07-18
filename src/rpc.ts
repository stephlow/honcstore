import { hc } from "hono/client";
import type { ApiType } from "./api";

export function createApiClient() {
  return hc<ApiType>("/api");
}

export async function createCart(userId?: number) {
  const client = createApiClient();

  const response = await client.carts.$post({
    json: {
      userId,
    },
  });

  return await response.json();
}

export async function getCartById(cartId: number) {
  const client = createApiClient();

  const response = await client.carts[":id"].$get({
    param: { id: String(cartId) },
  });

  return await response.json();
}

export async function addToCart(cartId: number, productId: number) {
  const client = createApiClient();
  const response = await client.carts[":id"].$put({
    json: {
      cartId: cartId,
      productId,
    },
    param: {
      id: String(cartId),
    },
  });

  return await response.json();
}

export async function authenticate(email: string, password: string) {
  const client = createApiClient();

  const response = await client.auth.$post({
    json: {
      email,
      password,
    },
  });

  return await response.json();
}

export async function createAccount(email: string, password: string) {
  const client = createApiClient();

  const response = await client.users.$post({
    json: {
      email,
      password,
    },
  });

  return await response.json();
}
