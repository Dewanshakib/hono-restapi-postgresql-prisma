import type { Context } from "hono";
import { prisma } from "../lib/prisma.js";
import { generateToken } from "../utils/generateToken.js";
import { setCookie, deleteCookie } from "hono/cookie";
import { hashPwd } from "../utils/hashPwd.js";
import { verifyPwd } from "../utils/verifyPwd.js";

// register
export const registerUser = async (c: Context) => {
  try {
    const { name, username, email, password } = await c.req.json();

    if (!name || !username || !email || !password) {
      return c.json({ message: "All fields are required" }, 400);
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      return c.json({ message: "User already registerd" }, 400);
    }

  
    // hash pwd
    const hashedPassword = hashPwd(password);

    await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return c.json({ message: "User registerd successfully" }, 201);
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
};

// login
export const loginUser = async (c: Context) => {
  try {
    const { name, email, password } = await c.req.json();

    if (!name || !email || !password) {
      return c.json({ message: "All fields are required" }, 400);
    }

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        id: true,
        password: true,
      },
    });

    if (!userExists) {
      return c.json({ message: "User not found" }, 404);
    }

    const [hash, salt] = userExists.password.split(".");

    const isMatched = verifyPwd(password, salt, hash);
    if (!isMatched) {
      return c.json({ message: "Invalid credentials" }, 401);
    }

    // token
    const token = await generateToken(userExists.id);
    if (!token) {
      return c.json({ message: "Error while creating token" }, 400);
    }

    // set cookie
    setCookie(c, "secret", token, {
      sameSite: "lax",
      httpOnly: true,
      path: "/",
      secure: true,
      maxAge: 3 * 24 * 3600, // 3 days
    });

    return c.json({ message: "User logged in successfully" }, 200);
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
};

// session
export const session = async (c: Context) => {
  try {
    const id = c.get("user").id;
    // console.log(id)
    const user = await prisma.user.findFirst({
      where: { id },
      select: { id: true, name: true, username: true, email: true },
    });

    return c.json(user, 200);
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
};

// logout
export const logout = async (c: Context) => {
  try {
    // clear the cookie
    deleteCookie(c, "secret");
    return c.json({ message: "User logged out successfully" });
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
};
