import crypto from "crypto";

export const hashPwd = (password: string) => {
  // make salt
  const salt = crypto.randomBytes(10).toString("hex");
  // make it hash
  const hashPwd = crypto.scryptSync(password, salt, 64);
  return `${hashPwd.toString("hex")}.${salt}`;
};
