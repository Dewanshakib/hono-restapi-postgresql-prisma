import crypto from "crypto";

export const verifyPwd = (
  password: string,
  salt: string,
  hash: string
): boolean => {
  const hashPwd = crypto.scryptSync(password, salt, 64).toString("hex");
  return hashPwd === hash;
};
