import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono();

// zodパス確認
app.get("/", (c) => {
  return c.text("zod root");
});

/******************************
 * query
 ******************************/
const querySchema = z.object({
  hoge: z.string(),
  unko: z.string(),
});

app.get(
  "/query",
  zValidator("query", querySchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.issues.map((i) => i.message).join("\n") }, 400);
    }
  }),
  (c) => {
    const { hoge, unko } = c.req.valid("query");
    console.log(hoge, unko);
    return c.text("ok");
  }
);

/******************************
 * json
 ******************************/
const jsonSchema = z.object({
  str: z.string(),
  num: z.number(),
});

app.post(
  "/json",
  zValidator("json", jsonSchema, (result, c) => {
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

/******************************
 * form
 ******************************/
const formSchema = z.object({
  hoge: z.string(),
  unko: z.string(),
});

app.post(
  "/form",
  zValidator("form", formSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.error.issues.map((i) => i.message).join("\n") }, 400);
    }
  }),
  (c) => {
    const { hoge, unko } = c.req.valid("form");
    console.log(hoge, unko);
    return c.text("ok");
  }
);

export default app;
