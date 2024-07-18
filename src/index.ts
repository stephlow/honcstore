// import { createHonoMiddleware } from "@fiberplane/hono";
import { Hono } from "hono";
import type { JwtVariables } from "hono/jwt";

import { api } from "./api";
import { web } from "./web";

type Bindings = {
  // biome-ignore lint/style/useNamingConvention: Environment variable
  DATABASE_URL: string;
  // biome-ignore lint/style/useNamingConvention: Environment variable
  JWT_SECRET: string;
};

type Variables = JwtVariables;

// biome-ignore lint/style/useNamingConvention: Hono convention
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// app.use(createHonoMiddleware(app));

app.route("/", web);
app.route("/api", api)

// biome-ignore lint/style/noDefaultExport: Hono convention
export default app;
