import { Hono } from "hono";
import { logger } from "hono/logger";
import bearer from "./authentication/bearer";
import basic from "./authentication/basic";
import zod from "./validation/zod";
import valibot from "./validation/valibot";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/basic", basic);
app.route("/bearer", bearer);
app.route("/zod", zod);
app.route("/valibot", valibot);

export default app;
