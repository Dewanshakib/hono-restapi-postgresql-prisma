import { Hono } from "hono";
import { registerUser, loginUser, session, logout, } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";
const userRouter = new Hono();
userRouter.use("/session", auth);
// register
userRouter.post("/register", registerUser);
// login
userRouter.post("/login", loginUser);
// session
userRouter.get("/session", session);
// logout
userRouter.post("/logout", logout);
export default userRouter;
