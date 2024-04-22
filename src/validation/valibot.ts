import { Hono } from "hono";
import { number, object, string } from "valibot";
import { vValidator } from "@hono/valibot-validator";

const app = new Hono();

// valibotパス確認
app.get("/", (c) => {
  return c.text("valibot root");
});

/******************************
 * query
 ******************************/
const querySchema = object({
  hoge: string(),
  unko: string(),
});

app.get("/query", vValidator("query", querySchema), (c) => {
  const { hoge, unko } = c.req.valid("query");
  console.log(hoge, unko);
  return c.text("ok");
});

/******************************
 * json
 ******************************/
const jsonSchema = object({
  str: string(),
  num: number(),
});

app.post(
  "/json",
  vValidator("json", jsonSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.issues.map((i) => i.message).join("\n") }, 400);
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
const formSchema = object({
  hoge: string(),
  unko: string(),
});

app.post(
  "/form",
  vValidator("form", formSchema, (result, c) => {
    if (!result.success) {
      return c.json({ message: result.issues.map((i) => i.message).join("\n") }, 400);
    }
  }),
  (c) => {
    const { hoge, unko } = c.req.valid("form");
    console.log(hoge, unko);
    return c.text("ok");
  }
);

export default app;
