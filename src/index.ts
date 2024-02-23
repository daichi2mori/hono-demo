import { Hono } from 'hono'
import bearer from "./bearer/bearer";
import basic from "./basic/basic";

const app = new Hono()

app.route("/basic", basic);
app.route("/bearer", bearer);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
