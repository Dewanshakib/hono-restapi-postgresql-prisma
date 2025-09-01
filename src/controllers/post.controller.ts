import type { Context } from "hono";
import { prisma } from "../lib/prisma.js";

// create post
export const createPost = async (c: Context) => {
  try {
    const { title, content } = await c.req.json();
    if (!title || !content) {
      return c.json({ message: "All fields are required" }, 400);
    }

    const id = c.get("user").id;
    if(!id){
      return c.json({message:"Not authorized"},401)
    }

    await prisma.post.create({
      data: {
        title,
        content,
        userId: id,
      },
    });

    return c.json({ message: "Post created successfully" });
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
};

// get posts
export const getPosts = async (c: Context) => {
  try {
    const allPosts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        userId: true,
      },
    });
    return c.json(allPosts, 200);
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
};

// get single post
export async function singlePost(c: Context) {
  try {
    const { id } = c.req.param();
    const postById = await prisma.post.findUnique({
      where: { id },
    });
    if (!postById) {
      return c.json({ message: "Cannot find post with this id" }, 404);
    }

    return c.json(postById, 200);
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
}

// delete post
export async function deletePost(c: Context) {
  try {
    // user validation
    const user = c.get("user").id;
    // console.log(user)
    if (!user) {
      return c.json({ message: "Not authorized" }, 401);
    }

    const { id } = c.req.param();
    const postById = await prisma.post.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!postById) {
      return c.json({ message: "Cannot find post with this id" }, 404);
    }

    await prisma.post.delete({ where: { id: postById.id } });

    return c.json({ message: "Post deleted successfully" }, 200);
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
}

// update post
export async function updatePost(c: Context) {
  try {
    // user validation
    const user = c.get("user").id;
    if (!user) {
      return c.json({ message: "Not authorized" }, 401);
    }

    const { id } = c.req.param();
    const postById = await prisma.post.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!postById) {
      return c.json({ message: "Cannot find post with this id" }, 404);
    }

    const { title, content } = await c.req.json();
    if (!title || !content) {
      return c.json({ message: "All fields are required" }, 404);
    }

    await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
      },
    });

    return c.json({ message: "Post updated successfully" }, 201);
  } catch (error) {
    return c.json(
      { message: error instanceof Error ? error.message : "Server error" },
      500
    );
  }
}
