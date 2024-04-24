import { tbValidator } from "@hono/typebox-validator";
import { Type } from "@sinclair/typebox";
import { Hono } from "hono";

const app = new Hono();

const schema = Type.Object({
  str: Type.String(),
  num: Type.Number(),
});

app.post(
  "/json",
  tbValidator("json", schema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.errors.map((i) => i.message).join("\n") }, 400);
    }
  }),
  (c) => {
    const { str, num } = c.req.valid("json");
    console.log(str, num);
    return c.text("ok");
  }
);

export default app;
