import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export const auth = async (c: Context, next: Next) => {
  try {
    // get cookie
    const token = getCookie(c, "secret");
    if (!token) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // decode token
    const decode = (await verify(token, process.env.JWT_SECRET!)) as {
      id: string;
    };
    if (!decode) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // console.log(decode)

    // setting user with userId in req context
    c.set("user", decode);
    return await next();
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
};
