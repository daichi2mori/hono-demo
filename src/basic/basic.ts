import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";

type Bindings = {
  USERNAME: string;
  PASSWORD: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// basicパス確認
app.get("/", (c) => {
  return c.text("basic root");
});

// all以下はすべて認証が必要
app.use("/all/*", async (c, next) => {
  const auth = basicAuth({
    username: c.env.USERNAME,
    password: c.env.PASSWORD,
  });
  return auth(c, next);
});

app.get("/all", (c) => {
  return c.text("basic/all");
});

app.get("/all/get", (c) => {
  return c.text("basic/all/get");
});

app.post("/all/post", (c) => {
  return c.text("basic/all/post");
});

// 特定のパスのみ
app.get(
  "something",
  (c, next) => {
    const auth = basicAuth({
      username: c.env.USERNAME,
      password: c.env.PASSWORD,
    });
    return auth(c, next);
  },
  async (c) => {
    return c.text("basic/something");
  }
);

export default app;
