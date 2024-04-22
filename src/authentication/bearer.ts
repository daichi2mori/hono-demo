import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";

type Bindings = {
  API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// bearerパス確認
app.get("/", (c) => {
  return c.text("bearer root");
});

// all以下はすべて認証が必要
app.use("/all/*", async (c, next) => {
  const auth = bearerAuth({ token: c.env.API_KEY });
  return auth(c, next);
});
app.get("/all", (c) => {
  return c.text("bearer/all");
});
app.get("/all/get", (c) => {
  return c.text("bearer/all/get");
});
app.post("/all/post", (c) => {
  return c.text("bearer/all/post");
});

// 特定のパスのみ
app.get(
  "/something",
  async (c, next) => {
    const auth = bearerAuth({ token: c.env.API_KEY });
    return auth(c, next);
  },
  async (c) => {
    return c.text("bearer/something");
  }
);

export default app;
