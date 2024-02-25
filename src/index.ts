import { Hono } from "hono";
import bearer from "./bearer/bearer";
import basic from "./basic/basic";
import { basicAuth } from "hono/basic-auth";

const app = new Hono();

// とりあえずつけとく
app.use(
  "/*",
  basicAuth({
    username: "gZW90yRhVy4Y",
    password: "UOGgThpgzLL5",
  })
);

app.route("/basic", basic);
app.route("/bearer", bearer);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
