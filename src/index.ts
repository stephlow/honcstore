import { createHonoMiddleware } from "@fiberplane/hono";
import { Hono } from "hono";
import { api } from "./api";

type Bindings = {
  // biome-ignore lint/style/useNamingConvention: Environment variable
  DATABASE_URL: string;
};

// biome-ignore lint/style/useNamingConvention: Hono convention
const app = new Hono<{ Bindings: Bindings }>();

app.use(createHonoMiddleware(app));

app.route("/api", api);

// biome-ignore lint/style/noDefaultExport: Hono convention
export default app;
