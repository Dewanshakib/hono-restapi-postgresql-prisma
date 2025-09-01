import { serve } from "@hono/node-server";
import { Hono } from "hono";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import "dotenv/config";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

// middlewares
app.use(csrf());
app.use(cors());
app.use(prettyJSON());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api/v1/users", userRouter);
app.route("api/v1/posts", postRouter);

app.notFound((c) => {
  return c.text("Custom 404 Message", 404);
});

serve(
  {
    fetch: app.fetch,
    port: 8000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
