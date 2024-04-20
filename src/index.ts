import { Hono } from "hono";
import bearer from "./bearer";
import basic from "./basic";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/basic", basic);
app.route("/bearer", bearer);

export default app;
