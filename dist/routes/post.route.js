import { Hono } from "hono";
import { createPost, deletePost, getPosts, singlePost, updatePost, } from "../controllers/post.controller.js";
import { auth } from "../middleware/auth.js";
const postRouter = new Hono();
postRouter.use("/create", auth);
postRouter.use("/update/:id", auth);
postRouter.use("/delete/:id", auth);
// create
postRouter.post("/create", createPost);
// get posts
postRouter.get("/", getPosts);
// single post
postRouter.get("/:id", singlePost);
// update post
postRouter.put("/update/:id", updatePost);
// delete post
postRouter.delete("/delete/:id", deletePost);
export default postRouter;
