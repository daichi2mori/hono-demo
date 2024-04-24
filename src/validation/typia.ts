import { Hono } from "hono";
import { typiaValidator } from "@hono/typia-validator";
import { typiaValidate } from "./typia/generated/typia";

const app = new Hono();

app.post(
  "/json",
  typiaValidator("json", typiaValidate, (result, c) => {
    if (!result.success) {
      return c.json({ message: "|||||／(￣ロ￣;)＼||||||| まじ～～？" }, 400);
    }
  }),
  (c) => {
    const { str, num } = c.req.valid("json");
    console.log(str, num);
    return c.text("ok");
  }
);

export default app;
