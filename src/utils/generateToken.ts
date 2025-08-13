import { sign } from "hono/jwt";

export const generateToken = async (userId: string) => {
  const payload = {
    id: userId,
    exp: Math.floor(Date.now() / 1000) + 3 * 24 * 3600, // Token expires in 5 minutes
  };
  const secret = process.env.JWT_SECRET!;
  return await sign(payload, secret);
};
